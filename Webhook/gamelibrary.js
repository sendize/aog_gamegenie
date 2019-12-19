var games = [
    {
        gameId: 0,
        title: "Dota 2",
        developer: "Valve",
        alt: [
            "Dota", "DOTA"
        ],
        genre: [ 
            "MOBA", "RTS", "MP"
        ],
        description: "Dota is a fun game.",
        img: 'https://steamcdn-a.akamaihd.net/steam/apps/570/header.jpg?t=1572450795'
    },
    {
        gameId: 1,
        title: "League of Legends",
        developer: "Riot",
        alt: [
            "LoL", "League"
        ],
        genre: [ 
            "MOBA", "RTS", "MP"
        ],
        description: "League of Legends is like Dota.",
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT4DImAjjRPs6XVh0F3oriH6Tv3vzaVM1ho0dLNPBvaOxsQiWsL'
    },
    {
        gameId: 2,
        title: "Counter Strike",
        developer: "Valve",
        alt: [
            "CS", "Counter-Strike"
        ],
        genre: [ 
            "FPS", "RTS", "MP"
        ],
        description: "Counter-Strike (CS) is a series of multiplayer first-person shooter video games, " + 
            "in which teams of terrorists battle to perpetrate an act of terror (bombing, hostage-taking, assassination) " + 
            "and counter-terrorists try to prevent it (bomb defusal, hostage rescue).",
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRAMDL-B_eF6kj2OIh0PCJG0vKAQ0UTMrVMJKlJWAIrBfU-T51R'
    },
    {
        gameId: 3,
        title: "Rainbow Six Siege",
        developer: "Ubisoft",
        alt: [
            "R6", "R6S", "Siege"
        ],
        genre: [ 
            "FPS", "RTS", "MP"
        ],
        description: "Tom Clancy's Rainbow Six Siege is a first-person shooter game, in which players utilize many different operators from the Rainbow team.",
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRDPGYMgt2_1EyQwb-zLybEC9AC6pdwKYOKlpMQc-MsxAYs9qZn'
    },
    {
        gameId: 4,
        title: "Black Desert Online",
        developer: "Pearl Abyss",
        alt: [
            "BDO", "Black Desert"
        ],
        genre: [ 
            "MOBA", "RPG", "MMORPG", "MP"
        ],
        description: "Black Desert Online is a sandbox-oriented fantasy massively multiplayer online role-playing game developed by Korean company Pearl Abyss and originally published for Microsoft Windows in 2015.",
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTIEpZ-N5kFRovZHJvu2MbEox4MQVkEci2MhmnpMEZR_r0DSsPE'
    },
    {
        gameId: 5,
        title: "Yakuza 0",
        developer: "SEGA",
        alt: [
            "Yakuza"
        ],
        genre: [ 
            "SDG", "SP"
        ],
        description: "Yakuza 0 is an action-adventure video game developed and published by Sega. ",
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS7I8BMufELo6_qZ6YVWtp2Blr46wUHWzRqsjz40a-SoOfpzlIv'
    },
    {
        gameId: 6,
        title: "Tomb Raider",
        developer: "Ubisoft",
        alt: [
            "TR"
        ],
        genre: [ 
            "SDG", "SP"
        ],
        description: "Tomb Raider, also known as Lara Croft: Tomb Raider between 2001 and 2007, is a media franchise that originated with an action-adventure video game series created by British gaming company Core Design.",
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQrpbro-5WavqzhgUv5u8iZGCBfgdGgyvIQ0FCWX_Tlf8z0HIaF'
    },
    {
        gameId: 7,
        title: "A Hat in Time",
        developer: "Gears for Breakfast",
        alt: [
            "Hat in Time", "AHIT"
        ],
        genre: [ 
            "SDG", "SP", "MP", "Platformer"
        ],
        description: "A Hat in Time is a cute-as-heck 3D platformer featuring a little girl who stitches hats for wicked powers!",
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRphhCNzgQDOE2_mzwipuG4EjWlXZoC7tj3WnfFUvopG5ndZ5Wu'
    },
    {
        gameId: 8,
        title: "PlayerUnknown's BattleGround",
        developer: "Bluehole",
        alt: [
            "PUBG"
        ],
        genre: [ 
            "BR", "MP", "FPS", "TPS"
        ],
        description: "PlayerUnknown's Battlegrounds is an online multiplayer battle royale game developed and published by PUBG Corporation, a subsidiary of South Korean video game company Bluehole.",
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTO-0nHuJBnNxDrcHfWL9Tmuvk3ntMgfbLm7JG5deWWXtfCL7Uh'
    },
    {
        gameId: 9,
        title: "Osu!",
        developer: "Peppy",
        alt: [
            "osu"
        ],
        genre: [ 
            "Rhythm", "SP", "MP"
        ],
        description: " Rhythm is just a *click* away! With Ouendan/EBA, Taiko and original gameplay modes, as well as a fully functional level editor.",
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSni7WeLzAliEh51PLx6wb3LyR-hzF_VQ3RkJwuXqosNO6j9P4b'
    },
    {
        gameId: 10,
        title: "Osu! The Second",
        developer: "Peppy",
        alt: [
            "Osu! 2", "osu", "Osu!"
        ],
        genre: [ 
            "Rhythm", "SP", "MP"
        ],
        description: " 2Rhythm is just a *click* away! With Ouendan/EBA, Taiko and original gameplay modes, as well as a fully functional level editor.",
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSni7WeLzAliEh51PLx6wb3LyR-hzF_VQ3RkJwuXqosNO6j9P4b'
    },
    {
        gameId: 11,
        title: "Call of Duty",
        developer: "Activision",
        alt: [
            "CoD, COD, cod"
        ],
        genre: [ 
            "FPS", "SDG", "SP", "MP"
        ],
        description: "Beng beng",
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT263R8C48z2Bsxj2nKG5gGLQ8ig_y02WvYhqpLaebo9vBOpfqY'
    }
];

var developers = [
    {
        name: "Valve",
        alt: ["volvo"]
    },
    {
        name: "Riot",
        alt: ["rito"]
    },
    {
        name: "Ubisoft",
        alt: ["ubi"]
    },
    {
        name: "Pearl Abyss",
        alt: ["PA", "Pearl", "Abyss"]
    },
    {
        name: "SEGA",
        alt: []
    },
    {
        name: "Gears for Breakfast",
        alt: ["GFB"]
    },
    {
        name: "Bluehole",
        alt: ["bh"]
    },
    {
        name: "Peppy",
        alt: ["ppy"]
    },
    {
        name: "Activision",
        alt: ["act"]
    }
]

var genre = [
    {
        name: "Multiplayer Online Battle Arena",
        alt: ["MOBA"]
    },
    {
        name: "Realtime Strategy",
        alt: ["RTS"]
    },
    {
        name: "First-Person Shooter",
        alt: ["FPS"]
    },
    {
        name: "Third-Person Shooter",
        alt: ["TPS"]
    },
    {
        name: "Massive Multiplayer Online Role-Playing Game",
        alt: ["MMORPG"]
    },
    {
        name: "Singleplayer Game",
        alt: ["SP"]
    },
    {
        name: "Multiplayer Game",
        alt: ["MP"]
    },
    {
        name: "Story Driven Game",
        alt: ["SDG"]
    },
    {
        name: "Platformer",
        alt: [""]
    },
    {
        name: "Battle Royale",
        alt: ["BR"]
    },
    {
        name: "Rhythm",
        alt: [""]
    }
]

module.exports = {
    games: games,
    genre: genre,
    developers: developers
}