/* feedreader.js
 *
 * This is unit tests of RSS feed reader application.
 */

/**
 * IIFE function to execute after DOM is ready.
 */
$(function () {

    describe('RSS Feeds', function () {

        // TODO: Ensure allFeeds are available and it is a non-empty array.
        it('Should be defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // TODO: Ensure each allFeeds elements has a URL defined and that the URL is not 
        // empty.
        it('Should has feeds with url property', function () {
            expect(allFeeds.filter(feed => !feed.url).length).toBe(0);
        });

        // TODO: Ensure each allFeeds elements has a name defined and that the name is 
        // not empty.
        it('Should has feeds with name property', function () {
            expect(allFeeds.filter(feed => !feed.name).length).toBe(0);
        });
    });

    describe('The menu', function () {

        // TODO: Ensure the menu element is hidden by default.
        it('Should be hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        // TODO: Ensure the menu changes visibility when the menu icon is clicked.
        it('Should change visibility when the menu icon is clicked', function () {
            // TODO: Ensure the menu display when clicked.
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
             // TODO: Ensure the menu hide when clicked again.
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function () {
        // TODO: Call loadFeed() to load the first feed.
        beforeEach(done => loadFeed(0, () => done()));
        
        // TODO: Ensure to there is at least a single .entry element.
        it('Should there is at least a single .entry element', function (done) {
            expect($('.entry').length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function () {
        const lastFeedIndex = allFeeds.length - 1;
        // TODO: Ensure to there more than one feed element, before testing.
        if (lastFeedIndex > 0) {
            let previousContent;
            beforeEach(done => {
                // TODO: Call loadFeed() to load the first feed.
                loadFeed(0, () => {
                    // TODO: Get the html code of the .feed content to save on 
                    // previousContent variable.
                    previousContent = $('.feed').html();
                    // TODO: Call loadFeed() to load the last feed.
                    loadFeed(lastFeedIndex, () => done());
                });
            });

            // TODO: Ensure to the .feed html content, after load the last feed, is 
            // different from previousContent variable value.
            it('Should there content change when a new feed is loaded', function (done) {
                expect($('.feed').html()).not.toEqual(previousContent);
                done();
            });
        }
    });
}());
