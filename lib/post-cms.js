//importing fs from node.js
//import fs from 'fs';
//importing path from node.js
//import path from 'path';

import got from 'got';

//setting data directory
//const dataDir = path.join(process.cwd(), 'data');

const DATA_URL = 'https://dev-cs5513-dl-week11.pantheonsite.io/wp-json/wp/v2/video-game';

//required nextjs function to get the sorted posts data
export async function getSortedPostsData() {
    //setting the file path
    //const filePath = path.join(dataDir, 'post.json');
    //reading the file
    //const jsonString = fs.readFileSync(filePath, 'utf8');
    //parsing the file
//    let jsonString;
//    try{
//         jsonString = await got(DATA_URL);
//         console.log(jsonString.body);
//     }
//     catch(error){
//         jsonString.body = [];
//         console.error(error);
//     }
    //parsing json file
    const jsonObj = await getContentFromCMS();
    //console.log(jsonObj);
    //sorting the posts by title
    jsonObj.sort(function(a, b) {
        //returning the title of the posts
        return a.title.rendered.localeCompare(b.title.rendered);
    });
    //mapping the posts to the id, title, and date
    return jsonObj.map(item => {
        //returning the id, title, and date
        return{
            id: item.id.toString(),
            title: item.title.rendered,
            //date: item.post_date,
            contentHtml: item.acf.video_game_description
        }
    });
}
//required nextjs function to grab all post ids
export async function getAllPostIds() {
    //grabbing filepath
    //const filePath = path.join(dataDir, 'post.json');
    //reading json file
    // let jsonString;

    // try{
    //     jsonString = await got(DATA_URL);
    //     //console.log(jsonString.body);
    // }
    // catch(error){
    //     jsonString.body = [];
    //     //console.error(error);
    // }
    //parsing json file
    const jsonObj = await getContentFromCMS();
    //mapping and grabbing only id
    return jsonObj.map(item => {
        //returning id as string
        return {
            params: {
                id: item.id.toString()
            }
        }
    });
}
//function to grab all the content and return it from json files
export async function getPostData(id) {
    //grabbing filepath
    //const filePath = path.join(dataDir, 'post.json');
    //reading json file
    //const jsonString = fs.readFileSync(filePath, 'utf-8');
//    let jsonString;
//    try{
//         jsonString = await got(DATA_URL);
//         //console.log(jsonString.body);
//     }
//     catch(error){
//         jsonString.body = [];
//         console.error(error);
//     }
    //parsing json file
    const jsonObj = await getContentFromCMS(); 
    //filtering id to ensure we have an id
    let objReturned = jsonObj.filter(obj =>{
        return obj.id.toString() === id;
    });
    //checking for any errors
    if (objReturned.length === 0){
        //returning for if nothing was found to avoid errors
        objReturned = {
            id: id,
            title: 'error finding post',
            post_content: 'error finding post'
        };
        return objReturned;  
    }
    //sending all ids to be used by nextjs
    else{
        return objReturned[0];
    }

}

async function getContentFromCMS(){
     let jsonString;
   try{
        jsonString = await got(DATA_URL);
        //console.log(jsonString.body);
    }
    catch(error){
        jsonString.body = [];
        console.error(error);
        return jsonString;
    }
    //parsing json file
    const jsonObj = JSON.parse(jsonString.body);
    return jsonObj;
}