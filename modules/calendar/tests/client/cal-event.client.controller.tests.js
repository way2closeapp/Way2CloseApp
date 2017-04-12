(function () {
  'use strict';

  describe('Calendar Events Controller Tests', function () {
    // Initialize global variables
    var CalendarController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      CalendarService,
      mockCalEvent;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _CalendarService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      CalendarService = _CalendarService_;

      // Ignore parent template get on state transitions
      $httpBackend.whenGET('/modules/core/client/views/home.client.view.html').respond(200, '');

      // create mock calendar event

      mockCalEvent = new CalendarService({
        _id: '525a8422f6d0f87f0e407a33',
        title: 'Coffee Break',
        start: '2016-07-23T04:34:47.293Z',
        end: '2016-07-23T04:34:47.293Z',
        className: ['coffeeBreak'],
        stick: true,
        customIndex: 0
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Calendar controller.
      CalendarController = $controller('CalendarController as vm', {
        $scope: $scope
      });
      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.addEvent()', function () {

      it('should send a POST request with the form input values', inject(function (CalendarService) {
        // $httpBackend is an angular object that lets us fake an http server behavior.
        // we can make http requests to this objects and it will act like a web server
        // for testing purposes

        // This handles a GET request made by uicalendar. We're not testing for this,
        // but we need to consume it in order to test the POST response below
        // Ignore parent template get on state transitions
        $httpBackend.whenGET('/api/calendar').respond(function(method, url, data, headers) {
          return [409, 'response body', {}, 'TestPhrase'];
        });

        // Set POST response
        $httpBackend.expectPOST('/api/calendar').respond(function(method, url, data, headers) {
          // we create an appropriate return value for the post request, based
          // on the data that we sent (the new event generated by the controller).
          var mockReturnData = new CalendarService(JSON.parse(data));
          mockReturnData._id = '525a8422f6d0f87f0e407a33';
          console.log(mockReturnData);
          return mockReturnData;
        });

        // Run controller functionality
        $scope.vm.addEvent();
        $httpBackend.flush();
      }));
    });


    describe('vm.update()', function () {

      it('should update a valid calendar event', inject(function (CalendarService) {

        // See comment above about the extra GET request
        $httpBackend.whenGET('/api/calendar').respond(function(method, url, data, headers) {
          return [409, 'response body', {}, 'TestPhrase'];
        });

        // Set PUT response
        $httpBackend.expectPUT(/api\/calendar\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.update(mockCalEvent);
        $httpBackend.flush();
      }));
    });

    describe('vm.remove()', function () {

      beforeEach(function () {
        // Setup calendar events
        $scope.vm.calEvents[0] = mockCalEvent;
      });

      it('should delete the calendar event', function () {

        // See comment above about the extra GET request
        $httpBackend.whenGET('/api/calendar').respond(function(method, url, data, headers) {
          return [409, 'response body', {}, 'TestPhrase'];
        });

        $httpBackend.expectDELETE(/api\/calendar\/([0-9a-fA-F]{24})$/).respond(204);

        // remove() takes an argument representing an index. In the beforeEach function
        // above, we set vm.calEvents[0] to be a mock calendar event.
        $scope.vm.remove(0);
        $httpBackend.flush();
      });

    });
  });
}());
