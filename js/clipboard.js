// ;(function(application) {
//     var Clipboard = {
//         init: function(target) {
//             if (target) {
//                 target.addEventListener('click', this.onLickCopyClick);
//             }
//         },
//         copy: function(target) {
//             var element = document.createElement('div');
//             var selection = window.getSelection();
//             var range;
//             var successCopy;

//             if (target) {
//                 element.innerHTML = target.textContent;
//                 document.body.appendChild(element);

//                 range = document.createRange();
//                 range.selectNode(element);
//                 selection.removeAllRanges();
//                 selection.addRange(range);

//                 try {
//                     successCopy = document.execCommand('copy');
//                 } catch(e) {
//                     successCopy = false;
//                 }

//                 if (successCopy) {
//                     document.body.removeChild(element);
//                     selection.removeAllRanges();
//                 }
//             }
            
//         }
//     }
//     window.Clipboard = Clipboard;
// })(window.Veres || {});



//     Utils.copyToClipboard = function (copyText, cb) {
//         // Do not use document.queryCommandSupported('copy') to check if copy is enabled - seems it's buggy now
//         // https://code.google.com/p/chromium/issues/detail?id=476508
//         var selection;
//         var range;
//         var buffer;
//         if (!copyText) {
//             return;
//         }

//         try {
//             range = document.createRange();
//             selection = window.getSelection();

//             buffer = document.createElement('div');
//             // Replace new line with <br> for correct view in Outlook
//             copyText = copyText.replace(/\r\n/gi, '<br>');

//             // Note: Chrome doesn't override the bg-color with transparent in Outlook, so use the #fff;
//             buffer.style.backgroundColor = '#fff';
//             buffer.style.font = 'normal normal 15px Calibri, sans-serif';
//             buffer.style['white-space'] = 'pre-wrap';
//             buffer.innerHTML = copyText;
//             document.body.appendChild(buffer);

//             range.selectNode(buffer);
//             selection.removeAllRanges();
//             selection.addRange(range);

//             var successful = document.execCommand('copy');
//             if (successful) {
//                 cb && cb();
//             } else {
//                 cb && cb('Failed to copy');
//             }

//         } catch (e) {
//             logger.error('[Utils]: Copy to clipboard failed');
//             cb && cb('Internal error');

//         } finally {
//             if (selection) {
//                 if (typeof selection.removeRange === 'function') {
//                     selection.removeRange(range);
//                 } else {
//                     selection.removeAllRanges();
//                 }
//             }

//             if (buffer) {
//                 document.body.removeChild(buffer);
//             }
//         }
//     };