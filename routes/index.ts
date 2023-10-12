import { Router } from '../deps.ts'
import controller from '../controllers/index.ts'
const router = new Router()

router.get('/:object/login', controller.login)
router.get('/:object/:id', controller.get)
router.delete('/:object/:id', controller.remove)

router.post('/:object', controller.create)

router.put('/:object/:id', controller.update)

// Generic Routes
router.get('/:object', controller.getAll)

router.put('/:object', controller.updateAll)

router.delete('/:object', controller.removeAll)


export default router