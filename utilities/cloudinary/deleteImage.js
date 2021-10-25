export default async (imageUrl) => {
    require('dotenv').config({ path: '../.env' })

    const cloudinary = require('cloudinary').v2
    let public_id = imageUrl.split('/')
    public_id = public_id[public_id.length - 1].split('.')[0]

    cloudinary.api.delete_resources(['public_id'], (err, result) => {
        if(err || result.deleted.sample === 'not_found') {
            throw new Error('An error occured!')
        }

        return 'Image deleted successfully'
    })
}


//ON SUCCESS
/*
{
  deleted: { sample: 'deleted' },
  deleted_counts: { sample: { original: 1, derived: 1 } },
  partial: false,
  rate_limit_allowed: 500,
  rate_limit_reset_at: 2021-10-25T08:00:00.000Z,
  rate_limit_remaining: 498
} undefined
*/