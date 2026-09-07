const express = require('express');
const router = express.Router();
const db = require('../models/database');

// Get all favorite assets
router.get('/:userId/watchlist', (req, res) => {
    try {
        const {
            userId
        } = req.params;

        let watchlist = db.getUserWatchlist(userId);
        if (!watchlist) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(watchlist);
    } catch (error) {
        console.error('Error fetching watchlist:', error);
        res.status(500).json({ error: 'Failed to fetch assets' });
    }
});

// Add to watchlist
router.post('/:userId/watchlist/:assetId', (req, res) => {
    try {
        const {userId, assetId} = req.params;
        if (!db.users.get(userId)) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!db.getAssetById(assetId)) {
            return res.status(404).json({ error: 'Asset not found' });
        }
        const watchlist = db.addWatchlist(userId, assetId);
        res.status(201).json(watchlist);
    } catch (error) {
        console.error('Error adding to watchlist:', error);
        res.status(500).json({ error: 'Failed to add to watchlist' });
    }
});

// Remove from watchlist
router.delete('/:userId/watchlist/:assetId', (req, res) => {
    try {
        const {userId, assetId} = req.params;
        if (!db.users.get(userId)) {
            return res.status(404).json({ error: 'User not found' });
        }
        const watchlist = db.removeFromWatchlist(userId, assetId);
        res.json(watchlist);
    } catch (error) {
        console.error('Error removing from  watchlist:', error);
        res.status(500).json({ error: 'Failed to remove watchlist' });
    }
});

module.exports = router;
