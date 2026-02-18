const payload = {
    status: "success",
    data: {
        // offers from offer2 provider
        "15828": {
            Offer: {
                // should be mapped to `externalOfferId`
                campaign_id: 15828,
                store_id: null,
                tracking_type: "CPA",
                campaign_vertical: "professional_finance",
                currency_name_singular: "coin",
                currency_name_plural: "coins",
                network_epc: "4.8359",
                // should be mapped to `thumbnail`
                icon: "https://some.url",
                // should be mapped to `name`
                name: "Sofi",
                // should be mapped to `offerUrlTemplate`
                tracking_url:
                    "https://some.url",
                // should be mapped to `requirements`
                instructions:
                    "Register with VALID personal information, Make a minimum deposit of $50,Redeem your points! *New Users Only!",
                disclaimer: null,
                // should be mapped to `description`
                description:
                    "SoFi is a one-stop shop for your finances, designed to help you Get Your Money Right.",
                short_description: "Make a Deposit to Earn!",
                offer_sticker_text_1: "RECOMMENDED",
                offer_sticker_text_2: null,
                offer_sticker_text_3: null,
                offer_sticker_color_1: "D100BC",
                offer_sticker_color_2: "FFFFFF",
                offer_sticker_color_3: "FFFFFF",
                sort_order_setting: null,
                category_1: "free",
                category_2: null,
                amount: 53550,
                payout_usd: 69.25,
                start_datetime: "2022-04-19 11:58:30",
                end_datetime: "2042-04-19 04:59:00",
                is_multi_reward: false,
            },
            Country: {
                include: {
                    US: {
                        id: 243,
                        code: "US",
                        name: "United States",
                    },
                },
                exclude: [],
            },
            State: {
                include: [],
                exclude: [],
            },
            City: {
                include: [],
                exclude: [],
            },
            Connection_Type: {
                cellular: true,
                wifi: true,
            },
            Device: {
                include: [],
                exclude: [],
            },
            OS: {
                // this should be mapped to `isAndroid`
                android: false,
                // this should be mapped to `isIos`
                ios: true,
                // this should be mapped to `isDesktop`
                web: true,
                min_ios: null,
                max_ios: null,
                min_android: null,
                max_android: null,
            },
        },
        "15829": {
            Offer: {
                campaign_id: 15829,
                name: "Valid Android Campaign",
                description: "High payout valid offer",
                instructions: "Reach level 10",
                icon: "https://valid.url/icon1.png",
                tracking_url: "https://valid.url/track1"
            },
            OS: { android: true, ios: false, web: false }
        },
        "15830": {
            Offer: {
                campaign_id: 15830,
                name: "", // INVALID
                description: "Empty name test",
                instructions: "N/A",
                icon: "https://valid.url/icon.png",
                tracking_url: "https://valid.url/track"
            },
            OS: { android: false, ios: true, web: true }
        },
        "15831": {
            Offer: {
                campaign_id: 15831,
                name: "Valid Desktop Offer",
                description: "Valid description",
                instructions: "Sign up",
                icon: "https://valid.url/icon.png",
                tracking_url: "https://valid.url/track"
            },
            OS: { android: false, ios: false, web: true }
        }
    },
};

module.exports = payload;