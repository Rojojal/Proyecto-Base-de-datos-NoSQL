// src/controllers/itemController.js
const itemService = require('../services/itemService');
 
class ItemController {
 
 
  async createItem(req, res) {
    try {
      const item = await itemService.createItem(req.body);
      res.status(201).json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
 
  async getItem(req, res) {
    try {
      const item = await itemService.getItem(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
 
  async updateItem(req, res) {
    try {
      const item = await itemService.updateItem(req.params.id, req.body);
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
 
  async deleteItem(req, res) {
    try {
      const item = await itemService.deleteItem(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json({ message: 'Item deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getAllItems(req, res) {
    try {
      
      const item = await itemService.getAllItems(req.query);
      
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }


}
 
module.exports = new ItemController(); 