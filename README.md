iFrame Autofitter
==============

What is the problem?
----------------

Most of the externally-hosted content is delivered to us in iFrames.
iFrames have their good points and their bad points. Good points include:
* They act as a sandbox to potentially unsafe content
* We mostly (from a development point of view) don't care what is in them
* Content easily included without messing around with nasty Javascript

iFrames are mostly bad because:
* I don't know how high the content is going to be.

We have a strong "mobile first" policy at __Tamedia / 20 Minuten__, but that doesn't always
mean that everyone we partner with (advertisers, sponsors, special content providers) is
as far down the line of the FutureTrain as we are. If they were, they would supply us
their content in a beautifully encapsulated, responsively designed, nicely namespaced
package with build scripts and tests.

More likely, though, is that we get an iFrame of unknowable content-proportions.

Or, as in the case of our brilliantly creative Data-Visualisation Team, the "third party"
content is flexible, variable, and capable of handling and responding to user-input.

The parent window owns the space in which the iFrame should be placed, and the parent
window decides how big that space should be. If the iFrame content is bigger than that,
we have the option to either clip the content (bad) or add scrollbars (ugly).

What does this script solve?
----------------

What _these scripts_ solve is the sizing problem
Include the file iframe_autofit_send.js in the iframe and include the iframe_autofit_recieve.js
in the parent window.

If you are a supplier of external content to 20minuten, the recieve.js is already included
and you just need to add send to your own includes.
