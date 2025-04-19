import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState('');
  const [offset, setOffset] = useState(0);
  const pageSize = 15;
  const navigate = useNavigate();

  const fetchCrossRefData = async (q = '', off = 0, append = false) => {
    const baseURL = q
      ? `https://api.crossref.org/works?query=${encodeURIComponent(q)}&rows=${pageSize}&offset=${off}`
      : `https://api.crossref.org/works?rows=${pageSize}&offset=${off}`;

    try {
      const res = await fetch(baseURL);
      const data = await res.json();
      const items = data.message.items.map((item) => ({
        title: item.title?.[0] || 'No title',
        text: item.abstract?.replace(/<[^>]+>/g, '') || item['container-title']?.[0] || 'No description',
        url: item.URL || '#',
      }));

      setArticles((prev) => (append ? [...prev, ...items] : items));
    } catch (err) {
      console.error('Failed to fetch:', err);
    }
  };

  useEffect(() => {
    fetchCrossRefData(query, offset, false);
  }, []);

  const handleSearch = () => {
    setOffset(0);
    fetchCrossRefData(query, 0, false);
  };

  const handleLoadMore = () => {
    const newOffset = offset + pageSize;
    setOffset(newOffset);
    fetchCrossRefData(query, newOffset, true);
  };

  const goToComments = (article) => {
    navigate('/comments', { state: { article } });
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="body-container">
        <Sidebar />
        <div className="main-content">
          <div style={{ padding: '20px', fontFamily: 'Inter, sans-serif' }}>
            <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ flex: 1, margin: '0 20px' }}>
                <input
                  type="text"
                  placeholder="Search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
                />
              </div>
              <button onClick={handleSearch} style={{ backgroundColor: '#c97a44', color: '#fff', padding: '10px 20px', borderRadius: '5px', border: 'none' }}>
                Advanced Research
              </button>
            </header>

            <main>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px'
              }}>
                {articles.map((article, index) => (
                  <div key={index} style={{
                    backgroundColor: '#fff',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
                    overflow: 'hidden',
                    transition: 'transform 0.2s',
                  }}>
                    <img
                      src="https://cdn.paperpile.com/guides/img/research-paper-illustr-400x400.png"
                      alt="Article thumbnail"
                      style={{ width: '100%', height: 'auto' }}
                    />
                    <div style={{ padding: '15px' }}>
                      <h4 style={{ fontSize: '18px', marginBottom: '10px' }}>{article.title}</h4>
                      <p style={{ fontSize: '14px', color: '#555', marginBottom: '15px' }}>{article.text}</p>
                      <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ color: '#007B5E', fontWeight: 600, textDecoration: 'none' }}>
                        View Details →
                      </a>
                      <div>
                        <button
                          onClick={() => goToComments(article)}
                          style={{
                            marginTop: '10px',
                            backgroundColor: '#e0e0e0',
                            color: '#333',
                            padding: '8px 16px',
                            borderRadius: '5px',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 500,
                          }}
                        >
                          Feedback
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button
                  onClick={handleLoadMore}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#007B5E',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  Load More
                </button>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
