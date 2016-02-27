/* Schema for each wiki page
 * name: Topic name
 * imgurl: URL of the image to be displayed
 * text: Text for the topic
 */

var mongoose = require('mongoose');

// Create a wiki page schema
var topicSchema = mongoose.Schema({
    name: String,
    imgurl: String,
    text: String
});

module.exports  = mongoose.model('topic', topicSchema);
