define({ "api": [
  {
    "type": "get",
    "url": "books",
    "title": "Request books",
    "name": "GetBooks",
    "group": "Books",
    "success": {
      "examples": [
        {
          "title": "Success-reponse:",
          "content": "HTTP/1.1 200 OK\n[ { \n  id: 1,\n  title: 'Classical Mechanics',\n  isbn: '9781891389221',\n  cover_url: 'https://www.uscibooks.com/taycm.jpg',\n  description:\n  'John Taylor has brought to his most recent book, Classical Mechanics, all of the clarity and insight that made his Introduction to Error Analysis a best-selling text.',\n  edition: '1',\n  year: 2005,\n  publisher_id: 1,\n  created_at: null,\n  updated_at: null,\n  publisher: 'University Science Books' \n} ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/books.js",
    "groupTitle": "Books"
  }
] });
