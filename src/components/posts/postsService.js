define([
    'knockout',
    'lodash',
    'bluebird',
    'moment',

    'components/posts/Post'
], function (
    ko,
    _,
    Promise,
    moment,

    Post
) {
    'use strict';

    var posts = [
        {
            id: "1",
            user: {
                id: "2",
                name: "Sam Soffes",
                images: {
                    medium: {
                        imageUri: "assets/images/avatars/avatar-2.png",
                        width: "62px",
                        position: {
                            x: "-12px",
                            y: "-5px"
                        }
                    }
                }
            },
            createdDate: moment().subtract(3, 'minutes').toISOString(),
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
                        images: {
                            medium: {
                                imageUri: "assets/images/avatars/avatar-3.png",
                                width: "48px",
                                position: {
                                    x: "-5px",
                                    y: "-3px"
                                }
                            }
                        }
                    },
                    createdDate: moment().subtract(1, 'hours').toISOString(),
                    content: {
                        body: "Great way to start the week. Thanks for sharing!"
                    }
                },
                {
                    id: "3",
                    user: {
                        id: "4",
                        name: "Ren Walker",
                        images: {
                            medium: {
                                imageUri: "assets/images/avatars/avatar-4.png",
                                width: "46px",
                                position: {
                                    x: "-3px",
                                    y: "-4px"
                                }
                            }
                        }
                    },
                    createdDate: moment().subtract(1, 'hours').toISOString(),
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
            id: "5",
            user: {
                id: "5",
                name: "Meg Robichaud",
                images: {
                    medium: {
                        imageUri: "assets/images/avatars/avatar-5.png",
                        width: "59px",
                        position: {
                            x: "-3px",
                            y: "-0px"
                        }
                    }
                }
            },
            createdDate: moment().subtract(25, 'minutes').toISOString(),
            content: {
                body: "My view this morning is simply beautiful... instagram.com/p/mV0PUrHRwQ/",
                links: {
                    "instagram.com/p/mV0PUrHRwQ/": "http://instagram.com/p/mV0PUrHRwQ/"
                }
            },
            media: {
                type: "image",
                content: {
                    uri: "assets/images/media/post-image-1.png",
                    width: "587px",
                    position: {
                        x: "-8px",
                        y: "-65px"
                    }
                }
            }
        },

        {
            id: "6",
            user: {
                id: "6",
                name: "Kerem Suer",
                images: {
                    medium: {
                        imageUri: "assets/images/avatars/avatar-6.png",
                        width: "75px",
                        position: {
                            x: "-28px",
                            y: "-8px"
                        }
                    }
                }
            },
            createdDate: moment().subtract(50, 'minutes').toISOString(),
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
                images: {
                    medium: {
                        imageUri: "assets/images/avatars/avatar-7.png",
                        width: "54px",
                        position: {
                            x: "-6px",
                            y: "-3px"
                        }
                    }
                }
            },
            createdDate: moment().subtract(1, 'hours').toISOString(),
            content: {
                body: "How to get animations out of your head. http://bit.ly/1q7BngO  Funny and useful.",
                links: {
                    "http://bit.ly/1q7BngO": "http://bit.ly/1q7BngO"
                }
            }
        },

        {
            id: "8",
            user: {
                id: "8",
                name: "Vitor Leal",
                images: {
                    medium: {
                        imageUri: "assets/images/avatars/avatar-8.png",
                        width: "44px",
                        position: {
                            x: "-2px",
                            y: "-2px"
                        }
                    }
                }
            },
            createdDate: moment().subtract(1, 'hours').toISOString(),
            content: {
                body: "You have to see this bike. It will make your daily commute a absolute joy ride! vimeo.com/p/mV0PUrHRwQ/",
                links: {
                    "vimeo.com/p/mV0PUrHRwQ/": "http://vimeo.com/p/mV0PUrHRwQ/"
                }
            },
            media: {
                type: "video",
                content: {
                    uri: "assets/images/media/post-image-2.png",
                    width: "600px",
                    position: {
                        x: "-13px",
                        y: "-80px"
                    }
                }
            }
        },

        {
            id: "9",
            user: {
                id: "9",
                name: "Pallavi Gupta",
                images: {
                    medium: {
                        imageUri: "assets/images/avatars/avatar-9.png",
                        width: "51px",
                        position: {
                            x: "-8px",
                            y: "-5px"
                        }
                    }
                }
            },
            createdDate: moment().subtract(3, 'minutes').toISOString(),
            content: {
                body: "Need some reading? 11 free ebooks for designers | Creative Bloq bit.ly/1lE5QDM via @netmag",
                links: {
                    "bit.ly/1lE5QDM": "http://bit.ly/1lE5QDM",
                    "@netmag": "#"
                }
            }
        },

        {
            id: "10",
            user: {
                id: "10",
                name: "Jenny Shen",
                images: {
                    medium: {
                        imageUri: "assets/images/avatars/avatar-10.png",
                        width: "54px",
                        position: {
                            x: "-7px",
                            y: "-9px"
                        }
                    }
                }
            },
            createdDate: moment().subtract(25, 'minutes').toISOString(),
            content: {
                body: "Perfect day to be outside taking pictures instagram.com/p/mV0PUrHRwQ/",
                links: {
                    "instagram.com/p/mV0PUrHRwQ/": "http://instagram.com/p/mV0PUrHRwQ/"
                }
            },
            media: {
                type: "image",
                content: {
                    uri: "assets/images/media/post-image-3.png",
                    width: "645px",
                    position: {
                        x: "-29px",
                        y: "-93px"
                    }
                }
            }
        },

        {
            id: "11",
            user: {
                id: "11",
                name: "Michael Wong",
                images: {
                    medium: {
                        imageUri: "assets/images/avatars/avatar-11.png",
                        width: "47px",
                        position: {
                            x: "-16px",
                            y: "-6px"
                        }
                    }
                }
            },
            createdDate: moment().subtract(1, 'hours').toISOString(),
            content: {
                body: "Awesome! Check this out. instagram.com/p/mV0PUrHRwQ/",
                links: {
                    "instagram.com/p/mV0PUrHRwQ/": "http://instagram.com/p/mV0PUrHRwQ/"
                }
            },
            media: {
                type: "video",
                content: {
                    uri: "assets/images/media/post-image-4.png",
                    width: "1280px",
                    position: {
                        x: "-213px",
                        y: "-133px"
                    }
                }
            }
        }
    ];

    var postMockModelsCollection = _.map(posts, function (obj) {
        return new Post(obj);
    });

    var settingsService = {
        getPosts: function (filter) {
            var posts = postMockModelsCollection;

            if (!_.isUndefined(filter) && filter !== "all") {
                posts = _.filter(postMockModelsCollection, function (postObj) {
                    if (postObj.hasMedia()) {
                        return postObj.data().media.type === filter;
                    }


                    return false;
                });
            }

            return Promise.resolve(posts);
        },

        createPost: function (newPost) {
            postMockModelsCollection.unshift(new Post(newPost));
            return Promise.resolve();
        }
    };

    return settingsService;
});