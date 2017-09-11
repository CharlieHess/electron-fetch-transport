import fetch from 'electron-fetch'
import FormData from 'form-data'

/**
 * Implements a transport for {@link https://github.com/slackapi/node-slack-sdk}
 * using `electron-fetch`, which under the surface uses the `net` module.
 *
 * @export
 * @param {Object} args       Request arguments, includes URL, data, & headers
 * @param {Function} callback A callback to invoke with parameters error,
 *                            headers, status, and body
 */
export default async function transport(args, callback) {
  try {
    const response = await fetch(args.url, {
      method: 'POST',
      body: formDataFromArgs(args.data || {}),
      headers: args.headers
    });

    const body = await response.text();
    callback(null, response.headers, response.status, body);
  } catch (error) {
    callback(error, {}, null, null);
  }
};

function formDataFromArgs(data) {
  return Object.keys(data).reduce((form, key) => {
    form.append(key, data[key].toString());
    return form;
  }, new FormData());
}
