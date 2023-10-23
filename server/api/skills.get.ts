/**
 * Retrieve Skills from DB
 * SHORT TERM - just use JSON file, we don't need to unnecessarily call the DB when skills don't change at the moment
 */
/*import client from './mongoConnection'

interface Skill {
    skill: string;
}
*/
//import fs from 'fs';
import SKILLDATA from './skills.json'

export default defineEventHandler(async (event) => {

    /*
        const query = getQuery(event);
        var skills_array: Skill[];
    
        const skillLimit = 10000;
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
            /*fs.writeFile("skillsFromCall.json", JSON.stringify(skills_array).toString(), function (err) {
                if (err) {
                    return console.error(err);
                }
                console.log("File created!");
            });*/

    /*return skills_array

} finally {
    // Ensures that the client will close when you finish/error
    await client.close();
}*/

    return SKILLDATA;
});