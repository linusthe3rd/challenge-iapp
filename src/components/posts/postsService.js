define([
    'knockout',
    'lodash',
    'bluebird'
], function (
    ko,
    _,
    Promise
) {
    'use strict';

    var posts = [
        {
            id: "1",
            user: {
                id: "2",
                name: "Sam Soffes",
                imageUri: "assets/images/avatar-1.png"
            },
            // createdDate:
            content: {
                body: "How to Get Inspired: the Right Way - Designmodo bit.ly/1lE4uJc Good stuff from @designmodo!",
                links: {
                    "bit.ly/1lE4uJc": "http://bit.ly/1lE4uJc",
                    "@designmodo": "#"
                }
            },
            replies: [
                {
                    id: "2",
                    user: {
                        id: "3",
                        name: "Jed Bridges",
                        imageUri: "assets/images/avatar-1.png"
                    },
                    // createdDate:
                    content: {
                        body: "Great way to start the week. Thanks for sharing!"
                    }
                },
                {
                    id: "3",
                    user: {
                        id: "4",
                        name: "Ren Walker",
                        imageUri: "assets/images/avatar-1.png"
                    },
                    // createdDate:
                    content: {
                        body: "Feeling inspired now... thanks for great article @designmodo",
                        links: {
                            "@designmodo": "#"
                        }
                    }
                }
            ]
        },

        {
            id: "4",
            user: {
                id: "4",
                name: "Meg Robichaud",
                imageUri: "assets/images/avatar-1.png"
            },
            // createdDate:
            content: {
                body: "My view this morning is simply beautiful... instagram.com/p/mV0PUrHRwQ/",
                links: {
                    "instagram.com/p/mV0PUrHRwQ/": "http://instagram.com/p/mV0PUrHRwQ/"
                }
            },
            media: {
                type: "image",
                source: "assets/images/avatar-1.png"
            }
        },

        {
            id: "6",
            user: {
                id: "6",
                name: "Kerem Suer",
                imageUri: "assets/images/avatar-1.png"
            },
            // createdDate:
            content: {
                body: "8 Apps to Turn Your Pipe Dreams Into Prototypes on.mash.to/1oubyu8",
                links: {
                    "on.mash.to/1oubyu8": "http://on.mash.to/1oubyu8"
                }
            }
        },

        {
            id: "7",
            user: {
                id: "7",
                name: "Liang Shi",
                imageUri: "assets/images/avatar-1.png"
            },
            // createdDate:
            content: {
                body: "How to get animations out of your head. http://bit.ly/1q7BngO  Funny and useful.",
                links: {
                    "http://bit.ly/1q7BngO": "http://bit.ly/1q7BngO"
                }
            }
        },

        {
            id: "5",
            user: {
                id: "5",
                name: "Vitor Leal",
                imageUri: "assets/images/avatar-1.png"
            },
            // createdDate:
            content: {
                body: "You have to see this bike. It will make your daily commute a absolute joy ride! vimeo.com/p/mV0PUrHRwQ/",
                links: {
                    "vimeo.com/p/mV0PUrHRwQ/": "http://vimeo.com/p/mV0PUrHRwQ/"
                }
            },
            media: {
                type: "video",
                source: "assets/images/avatar-1.png"
            }
        },

        {
            id: "8",
            user: {
                id: "8",
                name: "Pallavi Gupta",
                imageUri: "assets/images/avatar-1.png"
            },
            // createdDate:
            content: {
                body: "Need some reading? 11 free ebooks for designers | Creative Bloq bit.ly/1lE5QDM via @netmag",
                links: {
                    "bit.ly/1lE5QDM": "http://bit.ly/1lE5QDM",
                    "@netmag": "#"
                }
            }
        },

        {
            id: "9",
            user: {
                id: "9",
                name: "Jenny Shen",
                imageUri: "assets/images/avatar-1.png"
            },
            // createdDate:
            content: {
                body: "Perfect day to be outside taking pictures instagram.com/p/mV0PUrHRwQ/",
                links: {
                    "instagram.com/p/mV0PUrHRwQ/": "http://instagram.com/p/mV0PUrHRwQ/"
                }
            },
            media: {
                type: "image",
                source: "assets/images/avatar-1.png"
            }
        },

        {
            id: "10",
            user: {
                id: "10",
                name: "Michael Wong",
                imageUri: "assets/images/avatar-1.png"
            },
            // createdDate:
            content: {
                body: "Awesome! Check this out. instagram.com/p/mV0PUrHRwQ/",
                links: {
                    "instagram.com/p/mV0PUrHRwQ/": "http://instagram.com/p/mV0PUrHRwQ/"
                }
            },
            media: {
                type: "video",
                source: "assets/images/avatar-1.png"
            }
        }
    ];

    var settingsService = {
        getPosts: function () {
            return Promise.resolve(posts);
        },

        createPost: function (newPost) {
            posts.unshift(newPost);
            return Promise.resolve();
        }
    };

    return settingsService;
});