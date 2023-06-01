import { MapeoCloud } from "./index.js";

const config = await MapeoCloud.getConfig("./example.env")
const mapeoCloud = new MapeoCloud(config)
await mapeoCloud.start()
