import { db } from "../database/db.connection.js";

export function getAllCatsDB(){
   return db.query(`SELECT cats.*, 
   array_agg(cats_photos.photo_url) AS photo_urls
   FROM cats
   LEFT JOIN cats_photos ON cats.id = cats_photos.cat_id
   WHERE cats.active = true
   GROUP BY cats.id;
   `)
}

export function getCatByIdDB(id){
    return db.query(`SELECT * FROM cats WHERE id=$1;`, [id])
}

export function createCatDB(owner_id, name , characteristics , contact_info , active, photo_url){
    return db.query(`
    INSERT INTO cats (owner_id, name , characteristics , contact_info , active, photo_url)
    VALUES ($1, $2, $3, $4, $5m $6);`,
    [owner_id, name, characteristics , contact_info, active, photo_url])
}

export function updateCatDB(id, status, owner_id){
    return db.query(`UPDATE cats SET active=$1 WHERE id=$2 owner_id=$3 RETURNING *;`, [status, id, owner_id])
}