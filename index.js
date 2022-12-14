import * as path from 'path'
import * as fs from 'fs/promises'

import Corestore from 'corestore'
import Sqlite from 'better-sqlite3'
import { Mapeo } from '@mapeo/core'

import { schema, validate } from './lib/config.js'

export class MapeoCloud {
    constructor (config) {
        this.config = config
        this.config.corestoreDirectory = path.join(config.dataDirectory, 'corestore')
        this.config.sqliteFilepath = path.join(config.dataDirectory, 'sqlite.db')

        this.corestore  = new Corestore(this.config.corestoreDirectory)
        this.sqlite = new Sqlite(this.config.sqliteFilepath)
        this.mapeo = new Mapeo({
            corestore: this.corestore,
            sqlite: this.sqlite,
        })
    }

    static async getConfig (dotenvFilepath) {
        return validate({ dotenvFilepath, schema })
    }

    async start () {
        await this.mapeo.ready()
    }
}
