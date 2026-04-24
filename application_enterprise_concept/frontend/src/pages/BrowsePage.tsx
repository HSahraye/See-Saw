import { useEffect, useMemo, useState } from 'react';
import { getListings } from '../api/listingsApi';
import ListingCard from '../components/ListingCard';
import { categories, conditions, courses } from '../data/mockData';
import type { Listing } from '../types/models';

function BrowsePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');

  useEffect(() => {
    let isMounted = true;

    const loadListings = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getListings();
        if (isMounted) {
          setListings(data);
        }
      } catch {
        if (isMounted) {
          setError(
            'Unable to load listings from Flask API. Make sure Flask is running on http://127.0.0.1:5001.',
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadListings();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const matchesSearch =
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || listing.category_id === selectedCategory;
      const matchesCourse =
        selectedCourse === 'all' || listing.course_codes.includes(selectedCourse);
      const matchesCondition =
        selectedCondition === 'all' || listing.condition_id === selectedCondition;

      return matchesSearch && matchesCategory && matchesCourse && matchesCondition;
    });
  }, [listings, searchTerm, selectedCategory, selectedCourse, selectedCondition]);

  return (
    <section>
      <div className="page-header">
        <h1>Verified Campus Marketplace</h1>
        <p>
          Enterprise-ready campus commerce with identity, trust, and student social reputation.
        </p>
      </div>
      <div className="card filter-bar">
        <input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search listings, tags, or keywords"
        />
        <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category.category_id} value={category.category_id}>
              {category.name}
            </option>
          ))}
        </select>
        <select value={selectedCourse} onChange={(event) => setSelectedCourse(event.target.value)}>
          <option value="all">All Course Codes</option>
          {courses.map((course) => (
            <option key={course.course_id} value={course.code}>
              {course.code}
            </option>
          ))}
        </select>
        <select value={selectedCondition} onChange={(event) => setSelectedCondition(event.target.value)}>
          <option value="all">All Conditions</option>
          {conditions.map((condition) => (
            <option key={condition.condition_id} value={condition.condition_id}>
              {condition.label}
            </option>
          ))}
        </select>
      </div>
      {loading && <article className="card">Loading listings from Flask...</article>}
      {error && !loading && <article className="card error-box">{error}</article>}
      <div className="listing-grid">
        {filteredListings.map((listing) => (
          <ListingCard key={listing.listing_id} listing={listing} />
        ))}
      </div>
    </section>
  );
}

export default BrowsePage;
