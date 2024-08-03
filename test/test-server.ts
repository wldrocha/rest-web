import { Server } from '../src/presentation/server'
import { envs } from '../src/config/envs'
import { APPRoutes } from '../src/presentation/routes'

export const testServer = new Server({
  port: envs.PORT,
  public_path: envs.PUBLIC_PATH,
  routes: APPRoutes.routes
})
