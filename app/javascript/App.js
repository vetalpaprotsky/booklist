import React, { useState } from 'react';
import {default as UUID} from "node-uuid";

export default function App() {
  const [books, setBooks] = useState([]);
  const [action, setAction] = useState('list');
  const [formData, setFormData] = useState({title: "", author: ""});
  const [currentBookId, setCurrentBookId] = useState(null);

  const deleteBook = (id) => { setBooks(books.filter((book) => book.id != id)); };

  const editBook = (id) => {
    const currentBook = books.find((book) => book.id == id);
    setCurrentBookId(id);
    setFormData({...formData, title: currentBook.title, author: currentBook.author});
    setAction('form');
  };

  const saveBook = async (e) => {
    e.preventDefault();
    if (currentBookId) {
      bookIndex = books.findIndex((book => book.id == currentBookId));
      updatedBooks = [...books];
      updatedBooks[bookIndex] = formData;
      setBooks(updatedBooks);
      setCurrentBookId(null);
    } else {
      setBooks([...books, {...formData, id: UUID.v4()}]);
    }

    setFormData({ title: '', author: '', id: '' });
    setAction('list');
  };

  return (
    <>
      <h1>Books {books.length}</h1>
      { action == 'list' ? (
        <div>
          <button onClick={() => setAction('form')}>New book</button>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                books && books.map(
                  ({id, title, author}, i)=>(
                    <tr key={id}>
                      <td>{title}</td>
                      <td>{author}</td>
                      <td><button onClick={()=>editBook(id)}>Edit</button> <button onClick={()=>deleteBook(id)}>Delete</button></td>
                    </tr>
                  )
                )
              }
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <form>
            <label>Title:</label>
            <input onChange={(e) => setFormData({...formData, title: e.target.value})} name="title" value={formData.title}/>
            <label>Author:</label>
            <input onChange={(e) => setFormData({...formData, author: e.target.value})} name="author" value={formData.author}/>
            <button onClick={e => saveBook(e)}>Submit</button>
            <button onClick={() => setAction('list')}>Back</button>
          </form>
        </div>
      ) }
    </>
  )
};
