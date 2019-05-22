const db  = require('../data/dbConfig.js'),
      Authors = require('./authors.js'),
      prepBeforeEach = require('../helpers/prepBeforeEach.js');

describe('authors model', () => {
  beforeEach(done => prepBeforeEach(done));
  describe('get', () => {
    it('get all', async () => {
      const authors = await Authors.get();
      const seed = [
        {id: 1, name: 'John R. Taylor'},
      ];
      expect(authors).toEqual(seed);
    });
    it('get by id', async () => {
      const author = await Authors.get(1);
      const seed = {id: 1, name: 'John R. Taylor'};
      expect(author).toEqual(seed);
    });
  });
  describe('insert', () => {
    it('insert returns new author', async () => {
      const author = await Authors.insert({name: 'henry blevins'});
      expect(author).toEqual({id: 2, name: 'henry blevins'});
    });
  });
  describe('ofBook', () => {
    it('gets all authors of book', async () => {
      const authors = await Authors.ofBook(1);
      expect(authors).toEqual([{id: 1, name: 'John R. Taylor'}]);
    });
    it('empty array when none', async () => {
      const authors = await Authors.ofBook(123123123);
      expect(authors).toEqual([]);
    });
  });
  describe('update', () => {
    it('update author returns new', async () => {
      const author = await Authors.update(1, {name: 'New Name'});
      expect(author).toEqual({id: 1, name: 'New Name'});
    });
  });
  describe('remove', () => {
    it('foreign key failure', async () => {
      await expect(Authors.remove(1)).rejects.toThrow(/FOREIGN KEY/i);
    });
    it('success', async () => {
      const author = await Authors.insert({name: 'New Author'});
      const removed = await Authors.remove(author.id);
      expect(removed).toBe(1);
    });
  });
});
