const express = require('express');
const app = express();
const PORT = 3000;

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.get('/offers1', (req, res) => {
    res.json({
        response: {
            offers: [
                {
                    offer_id: "valid-1",
                    offer_name: "Valid iOS App",
                    offer_desc: "Standard valid description",
                    call_to_action: "Install and run",
                    offer_url: "https://valid.url/1",
                    image_url: "https://valid.url/img1.png",
                    platform: "mobile",
                    device: "iphone_ipad"
                },
                {
                    // INVALID: Missing offer_name 
                    offer_id: "invalid-2",
                    offer_desc: "This has no name",
                    call_to_action: "Fail",
                    offer_url: "https://fail.url",
                    image_url: "https://fail.url/img.png",
                    platform: "desktop",
                    device: "windows"
                },
                {
                    // INVALID: URL 
                    offer_id: "invalid-3",
                    offer_name: "Bad URL Offer",
                    offer_desc: "Valid desc",
                    call_to_action: "Valid CTA",
                    offer_url: "not-a-url", 
                    image_url: "https://valid.url/img.png",
                    platform: "mobile",
                    device: "android"
                }
            ]
        }
    });
});


app.get('/offers2', (req, res) => {
    res.json({
        status: "success",
        data: {
            "2001": {
                Offer: {
                    campaign_id: 2001,
                    name: "Valid Android Campaign",
                    description: "High payout valid offer",
                    instructions: "Reach level 10",
                    icon: "https://valid.url/icon1.png",
                    tracking_url: "https://valid.url/track1"
                },
                OS: { android: true, ios: false, web: false }
            },
            "2002": {
                Offer: {
                    campaign_id: 2002,
                    name: "", // INVALID: Empty name
                    description: "Empty name test",
                    instructions: "N/A",
                    icon: "https://valid.url/icon.png",
                    tracking_url: "https://valid.url/track"
                },
                OS: { android: false, ios: true, web: true }
            },
            "2003": {
                Offer: {
                    campaign_id: 2003,
                    name: "Valid Desktop Offer",
                    description: "Valid description",
                    instructions: "Sign up",
                    icon: "https://valid.url/icon.png",
                    tracking_url: "https://valid.url/track"
                },
                OS: { android: false, ios: false, web: true }
            }
        }
    });
});

app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));