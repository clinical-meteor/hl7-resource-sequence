describe('clinical:hl7-resources-sequences', function () {
  var server = meteor();
  var client = browser(server);

  it('Sequences should exist on the client', function () {
    return client.execute(function () {
      expect(Sequences).to.exist;
    });
  });

  it('Sequences should exist on the server', function () {
    return server.execute(function () {
      expect(Sequences).to.exist;
    });
  });

});
