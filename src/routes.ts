import { Router } from 'express';

import middleware from './middleware'

import { HomeController } from './home';
import { UserController } from './auth';

const homeController = new HomeController();
const userController = new UserController();

const routes = Router();

routes.post('/authentication', userController.login);
routes.post('/registering', userController.create);

routes.get('/index', homeController.index);

routes.use(middleware);

routes.post('/create', homeController.create);
routes.put('/update/:id', homeController.update);
routes.delete('/delete/:id', homeController.delete);

routes.post('/email/:id', homeController.email);
routes.get('/accepting/:id', homeController.accepting);

export { routes };