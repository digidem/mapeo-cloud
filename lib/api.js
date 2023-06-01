// @ts-check
import fastify from 'fastify'
import ws from '@fastify/websocket'

const f = fastify({logger:true})

/**
 * @type {import('@fastify/websocket').WebsocketHandler}
 */
const defaultHandler = (conn,_) => {
  conn.pipe(conn)
}

/**
 * @param {import('@fastify/websocket').WebsocketHandler} handler
 */
const setup = (handler = defaultHandler) => {
  f.register(ws)
  f.register(async (fastify) => {
    fastify.route({
      method:'GET',
      url: '/sync',
      handler: (_,reply) => {
        reply.code(101)
          .headers({
            'Upgrade': 'websocket',
            'Connection': 'Upgrade'
          })
          .send('ok')
      },
      wsHandler: handler
    })
  })
}

/**
 * @param {import('@fastify/websocket').WebsocketHandler} handler
 */
export const start = async (handler) => {
  setup(handler)
  try{
    await f.listen({port: 3000})
  }catch(e){
    f.log.error(e)
    process.exit(1)
  }
}
