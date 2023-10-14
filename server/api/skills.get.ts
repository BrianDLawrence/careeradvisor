/**
 * Retrieve Poems from database - default is 5 of the latest poems
 * FUTURE - have option to search by Cat name
 */
import client from './mongoConnection'

interface Skill {
    skill: string;
}

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    var skills_array: Skill[];

    const skillLimit = 1000;
    let filter = {}

    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const database = client.db("CareerInformaticsDB");
        const skillCollection = database.collection<Skill>("skills");

        const skills = skillCollection.find<Skill>(
            filter,
            {
                sort: { $natural: -1 }, //return latest first by date
                projection: { _id: 1, skill: 1 },
            }
        ).limit(skillLimit);

        if ((await skillCollection.countDocuments(filter)) === 0) {
            console.warn("No documents found!");
            return []
        }

        skills_array = await skills.toArray();

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }

    return skills_array;
});