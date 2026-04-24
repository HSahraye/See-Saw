import { useState } from 'react';
import { categories, conditions, courses } from '../data/mockData';

function CreateListingPage() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    listingType: 'fixed',
    category: '',
    condition: '',
    courseCode: '',
    tags: '',
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: string[] = [];
    if (!form.title.trim()) nextErrors.push('Title is required.');
    if (!form.description.trim()) nextErrors.push('Description is required.');
    if (!form.price || Number(form.price) <= 0) nextErrors.push('Price must be greater than zero.');
    if (!form.category) nextErrors.push('Category is required.');
    if (!form.condition) nextErrors.push('Condition is required.');
    setErrors(nextErrors);
    setSaved(nextErrors.length === 0);
  };

  const onChange = (key: string, value: string) => {
    setSaved(false);
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section>
      <div className="page-header">
        <h1>Create Listing</h1>
        <p>Clean enterprise form with classroom-safe mock submission flow.</p>
      </div>
      <form className="card form-grid" onSubmit={handleSubmit}>
        <label>
          Title
          <input value={form.title} onChange={(event) => onChange('title', event.target.value)} />
        </label>
        <label>
          Description
          <textarea
            value={form.description}
            onChange={(event) => onChange('description', event.target.value)}
            rows={4}
          />
        </label>
        <label>
          Price
          <input
            type="number"
            min={1}
            value={form.price}
            onChange={(event) => onChange('price', event.target.value)}
          />
        </label>
        <label>
          Listing Type
          <select value={form.listingType} onChange={(event) => onChange('listingType', event.target.value)}>
            <option value="fixed">Fixed Price</option>
            <option value="auction">Auction</option>
          </select>
        </label>
        <label>
          Category
          <select value={form.category} onChange={(event) => onChange('category', event.target.value)}>
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Condition
          <select value={form.condition} onChange={(event) => onChange('condition', event.target.value)}>
            <option value="">Select condition</option>
            {conditions.map((condition) => (
              <option key={condition.condition_id} value={condition.condition_id}>
                {condition.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Course Code
          <select value={form.courseCode} onChange={(event) => onChange('courseCode', event.target.value)}>
            <option value="">Optional course code</option>
            {courses.map((course) => (
              <option key={course.course_id} value={course.code}>
                {course.code}
              </option>
            ))}
          </select>
        </label>
        <label>
          Tags
          <input value={form.tags} onChange={(event) => onChange('tags', event.target.value)} placeholder="comma,separated,tags" />
        </label>
        <label>
          Image Upload (Placeholder)
          <input type="file" disabled />
        </label>
        {errors.length > 0 && (
          <div className="error-box">
            {errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
        {saved && <p className="success-text">Listing draft validated and ready to publish.</p>}
        <button type="submit" className="button button-primary">
          Save & Publish
        </button>
      </form>
    </section>
  );
}

export default CreateListingPage;
