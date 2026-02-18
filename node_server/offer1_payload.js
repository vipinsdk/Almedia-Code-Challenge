const payload = {
    query: {
        pubid: "1",
        appid: 1,
        country: "",
        platform: "all",
    },
    response: {
        currency_name: "Coins",
        offers_count: 2729,
        // this will be an array of offers
        // this can be multiple, so please consider this
        offers: [
            {
                // should be mapped to `externalOfferId`
                offer_id: "19524555",
                // should be mapped to `name`
                offer_name: "MyGym - iOS",
                // should be mapped to `description`
                offer_desc: "Play and reach level 23 within 14 days.",
                // should be mapped to `requirements`
                call_to_action: "Play and reach level 23 within 14 days.",
                disclaimer:
                    "This offer rewards within 24 hours. New users only.",
                // should be mapped to offerUrlTemplate
                offer_url:
                    "https://some.url",
                offer_url_easy:
                    "https://some.url",
                payout: 10.675,
                payout_type: "cpe",
                amount: 8873,
                // should be mapped to `thumbnail`
                image_url:
                    "https://some.url",
                image_url_220x124:
                    "https://some.url",
                countries: ["NZ"],
                // combine platform and device to map to `isDesktop`, `isAndroid`, `isIos`
                platform: "mobile", // possible values are "desktop" | "mobile"
                device: "iphone_ipad", // anything else should be considered as android
                category: {
                    "9": "Mobile Apps",
                },
                last_modified: 1645095666,
                preview_url: "https://some.url",
                package_id: "idnumbers",
                verticals: [
                    {
                        vertical_id: "4",
                        vertical_name: "Lifestyle",
                    },
                    {
                        vertical_id: "11",
                        vertical_name: "Health",
                    },
                ],
            },
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
        ],
    },
};

module.exports = payload;