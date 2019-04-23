/**
 * function to execute after DOM is ready.
 */
$(function () {

    /**
     * Test suite related to RSS feeds definitions are correctly declared 
     * and available in application.
     */
    describe('RSS Feeds', function () {

        /* 
         * Ensure allFeeds are available and it is a non-empty array.
         */
        it('Should be defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* 
         * Ensure each allFeeds elements has a URL defined and that the URL is not 
         * empty.
         */
        it('Should has feeds with url property', function () {
            expect(allFeeds.filter(feed => !feed.url).length).toBe(0);
        })

        /* 
         * Ensure each allFeeds elements has a name defined and that the name is 
         * not empty.
         */
        it('Should has feeds with name property', function () {
            expect(allFeeds.filter(feed => !feed.name).length).toBe(0);
        })
    });

    /**
     * Test suite related to menu functionalities.
     */
    describe('The menu', function () {

        /* 
         * Ensure the menu element is hidden by default.
         */
        it('Should be hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* 
         * Ensure the menu changes visibility when the menu icon is clicked.
         * Does the menu display when clicked and does it hide when clicked again.
         */
        it('Should change visibility when the menu icon is clicked', function () {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /**
     * Test suite related to initial Entries load.
     */
    describe('Initial Entries', function () {
        /*
         * Call loadFeed() to load the first feed.
         */
        beforeEach(done => loadFeed(0, () => done()));
        /* 
         * Ensure to there is at least a single .entry element
         */
        it('Should there is at least a single .entry element', function (done) {
            expect($('.entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /**
     * Test suite related to new feed selections.
     */
    describe('New Feed Selection', function () {
        const lastFeedIndex = allFeeds.length - 1;
        /*
         * Before this test, ensure to there more than one feed element.
         */
        if (lastFeedIndex > 0) {
            /*
             * Call loadFeed() to load the first feed, then get the html code of 
             * the .feed content to put on previousContent variable.
             * Call loadFeed() to load the last feed.
             */
            let previousContent;
            beforeEach(done => {
                loadFeed(0, () => {
                    previousContent = $('.feed').html();
                    loadFeed(lastFeedIndex, () => done());
                });
            });

            /*
             * Ensure to the .feed html content, after load the last feed, is 
             * different from previousContent variable value.
             */
            it('Should there content change when a new feed is loaded', function (done) {
                expect($('.feed').html()).not.toEqual(previousContent);
                done();
            });
        }
    });
}());
