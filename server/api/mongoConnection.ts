import { MongoClient, ServerApiVersion } from 'mongodb'

const config = useRuntimeConfig();
if (!config.mongoURI)
    throw createError({
        statusCode: 400,
        statusMessage: "UNDEFINED RUNTIME CONFIGURATION - NO MONGO URI"
    })

const client = new MongoClient(config.mongoURI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export default client;