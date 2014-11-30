angular.module('directives.ngReviewEditor', [])
    .directive('ngReviewEditor', ['$http', function ($http) {
        return {
            restrict: 'E',
            scope:{reviewEdit: '=', onSuccess: '&'},
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
                    var current = new Date();
                    $http.post('/api/upload/init', {'uploader': scope.uploader, 'createTime': current})
                        .success(function(data) {
                            scope.uploadSuccess = scope.moments.length;
                            scope.flow.opts.target = '/api/upload';
                            scope.flow.opts.chunkSize = 20 * 1024 * 1024;
                            scope.flow.opts.forceChunkSize = true;
                            scope.flow.opts.testChunks = false;
                            scope.flow.opts.query = {'moments': JSON.stringify(scope.moments), 'momentId': data._id};
                            scope.flow.upload();
                        })
                        .error(function(data) {
                            console.log('Error: ' + data);
                        });
                };
                scope.uploadSuccsess = function(message){
                    scope.uploadSuccess += 1;
                    if(scope.uploadSuccess == scope.moments.length+1){
                        scope.$parent.reviews.refresh();
                    }
                    scope.exitEdit();
                };
                scope.exitEdit = function(){
                    scope.moments = [];
                    scope.uploadSuccess = 0;
                    if(scope.flow){
                        scope.flow.cancel();
                    }
                };
                scope.resizeBeforeUpload = function(flowFile) {
                    var that = flowFile;
                    if (!(that.file.hasOwnProperty('alreadyResized') && that.file.alreadyResized)) {
                        var fileName = that.name;
                        var parts = fileName.split('.');
                        parts.splice(parts.length-1, 0, new Date().getTime());
                        that.name = parts.join('.');
                        scope.moments[scope.moments.length-1].keyName = that.name;
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
                                maxWidth: 486,
                                maxHeight: 486
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