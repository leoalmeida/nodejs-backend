import { Router } from 'express';
const router = Router({mergeParams: true});

import articleRoutes from './article-routes.js';
import resourceRoutes from './resource-routes.js';
import statusRoutes from './status-routes.js';
import userRoutes from './user-routes.js';

router.use("/articles", articleRoutes);
router.use("/resources", resourceRoutes);
router.use("/status", statusRoutes);
router.use("/users", userRoutes);

router.route('/health')
    .get(function (req, res) {
        res.status(200)
            .send('UP');
    });

export default router;