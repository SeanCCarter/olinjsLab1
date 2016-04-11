/* Schema for each wiki page
 * name: Topic name
 * imgurl: URL of the image to be displayed
 * text: Text for the topic
 */

var mongoose = require('mongoose');

// Create a wiki page schema
var topicSchema = mongoose.Schema({
    name: String,
    imgurl: String, // images didn't end up happening, looks like? completely ok, but would be nice to go back and clean up
    text: String
});

module.exports  = mongoose.model('topic', topicSchema);
