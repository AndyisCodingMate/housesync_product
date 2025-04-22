const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Read the image files directly (no need to decode base64)
            const image1Buffer = fs.readFileSync('./base64images/image1.jpg');
            const image2Buffer = fs.readFileSync('./base64images/image2.jpg');

            // Create FormData to send images to Face++
            const form = new FormData();
            form.append('api_key', process.env.FACE_PLUS_PLUS_API_KEY);
            form.append('api_secret', process.env.FACE_PLUS_PLUS_API_SECRET);
            form.append('image_file1', image1Buffer, { filename: 'image1.jpg' });
            form.append('image_file2', image2Buffer, { filename: 'image2.jpg' });

            // Send request to Face++ API
            const response = await axios.post('https://api-us.faceplusplus.com/facepp/v3/compare', form, {
                headers: {
                    ...form.getHeaders(),
                },
            });

            const confidence = response.data.confidence;

            // Return comparison result
            if (confidence > 80) {
                return res.status(200).json({ message: 'The images are the same person!', confidence });
            } else {
                return res.status(400).json({ message: 'The images are not the same person.', confidence });
            }
        } catch (error) {
            console.error('Error during face verification:', error);
            return res.status(500).json({ message: 'Something went wrong', error });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}

module.exports = handler;