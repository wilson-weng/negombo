angular.module('directives.ngReviewEditor', [])
    .directive('ngReviewEditor', ['$http', function ($http) {
        return {
            restrict: 'E',
            scope:{reviewEdit: '='},
            templateUrl:  '/javascripts/angular/common/directives/ng-review-editor/editor.tpl.html',
            link: function (scope, element, attrs) {
                scope.moments = [];
                scope.uploadSuccess = 0;
                scope.edit = scope.reviewEdit || {};
                scope.addMoment = function(){
                    scope.moments.push({index: scope.moments.length});
                };
                scope.edit.addMoment = scope.addMoment;
                scope.setFlow = function (flow) {
                    scope.flow = flow;
                    scope.flow.files = scope.flow.files.slice(0, scope.moments.length);
                };
                scope.upload = function(){
                    scope.uploadSuccess = scope.moments.length;
                    scope.flow.opts.target = '/api/upload';
                    scope.flow.opts.chunkSize = 20 * 1024 * 1024;
                    scope.flow.opts.forceChunkSize = true;
                    scope.flow.opts.testChunks = false;
                    scope.flow.opts.query = {'moments': JSON.stringify(scope.moments), 'uploader': scope.uploader, 'createTime': new Date()};
                    scope.flow.upload();
                };
                scope.onSuccsess = function(message){
                    console.log(message);
                };
                scope.resizeBeforeUpload = function(flowFile) {
                    var that = flowFile;
                    if (!(that.file.hasOwnProperty('alreadyResized') && that.file.alreadyResized)) {
                        var fileName = that.name;
                        var parts = fileName.split('.');
                        parts.splice(parts.length-1, 0, new Date().getTime());
                        that.name = parts.join('.');
                        scope.moments[scope.moments.length-1].keyName = that.name;
                        console.log(that.name);
                        loadImage(that.file,
                            function (canvas) {
                                canvas.toBlob(
                                    function (blob) {
                                        blob.alreadyResized = true;
                                        for (var key in that.file) blob[key] = that.file[key];
                                        blob.name = that.name;
                                        that.flowObj.addFile(blob);
                                        that.flowObj.removeFile(that);
                                    }
                                )
                            },
                            {
                                canvas: true,
                                crop: false,
                                maxWidth: 300,
                                maxHeight: 300
                            }
                        );
                        return false;
                    }
                    else
                    {
                        return true;
                    }
                };
            }
        }
    }]);