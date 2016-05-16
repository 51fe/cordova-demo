var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    app.receivedEvent();
  },
  // Update DOM on a Received Event
  receivedEvent: function() {
    var photo = document.getElementById('photo');

    document.getElementById('capturePhotoBtn').addEventListener('click', function() {
      navigator.camera.getPicture(function(imageData) {
        photo.style.display = 'block';
        // 当成功获得一张照片的Base64编码数据后被调用
        photo.src = "data:image/jpeg;base64," + imageData;
      }, onFail, {
        quality: 75,
        saveToPhotoAlbum: true,
        destinationType: Camera.DestinationType.DATA_URL
      });
    });

    document.getElementById('getPictureBtn').addEventListener('click', function() {
      // 从设定的来源处获取图像文件URI 
      navigator.camera.getPicture(function(imageURI) {
        photo.style.display = 'block';
        photo.src = imageURI;
      }, onFail, {
        quality: 75,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
      });
    });

    // 当有错误发生时触发此函数 
    function onFail(message) {
      alert('错误：' + message);
    }
  }
};

app.initialize();
