var BinaryFile = function(strData, iDataOffset, iDataLength) {
	var data = strData;
	var dataOffset = iDataOffset || 0;
	var dataLength = 0;

	this.getRawData = function() {
		return data;
	}

	if (typeof strData == "string") {
		dataLength = iDataLength || data.length;

		this.getByteAt = function(iOffset) {
			return data.charCodeAt(iOffset + dataOffset) & 0xFF;
		}
	} else if (typeof strData == "unknown") {
		dataLength = iDataLength || IEBinary_getLength(data);

		this.getByteAt = function(iOffset) {
			return IEBinary_getByteAt(data, iOffset + dataOffset);
		}
	}

	this.getLength = function() {
		return dataLength;
	}

	this.getSByteAt = function(iOffset) {
		var iByte = this.getByteAt(iOffset);
		if (iByte > 127)
			return iByte - 256;
		else
			return iByte;
	}

	this.getShortAt = function(iOffset, bBigEndian) {
		var iShort = bBigEndian ? 
			(this.getByteAt(iOffset) << 8) + this.getByteAt(iOffset + 1)
			: (this.getByteAt(iOffset + 1) << 8) + this.getByteAt(iOffset)
		if (iShort < 0) iShort += 65536;
		return iShort;
	}
	this.getSShortAt = function(iOffset, bBigEndian) {
		var iUShort = this.getShortAt(iOffset, bBigEndian);
		if (iUShort > 32767)
			return iUShort - 65536;
		else
			return iUShort;
	}
	this.getLongAt = function(iOffset, bBigEndian) {
		var iByte1 = this.getByteAt(iOffset),
			iByte2 = this.getByteAt(iOffset + 1),
			iByte3 = this.getByteAt(iOffset + 2),
			iByte4 = this.getByteAt(iOffset + 3);

		var iLong = bBigEndian ? 
			(((((iByte1 << 8) + iByte2) << 8) + iByte3) << 8) + iByte4
			: (((((iByte4 << 8) + iByte3) << 8) + iByte2) << 8) + iByte1;
		if (iLong < 0) iLong += 4294967296;
		return iLong;
	}
	this.getSLongAt = function(iOffset, bBigEndian) {
		var iULong = this.getLongAt(iOffset, bBigEndian);
		if (iULong > 2147483647)
			return iULong - 4294967296;
		else
			return iULong;
	}
	this.getStringAt = function(iOffset, iLength) {
		var aStr = [];
		for (var i=iOffset,j=0;i<iOffset+iLength;i++,j++) {
			aStr[j] = String.fromCharCode(this.getByteAt(i));
		}
		return aStr.join("");
	}

	this.getCharAt = function(iOffset) {
		return String.fromCharCode(this.getByteAt(iOffset));
	}
	this.toBase64 = function() {
		return window.btoa(data);
	}
	this.fromBase64 = function(strBase64) {
		data = window.atob(strBase64);
	}
}


var BinaryAjax = (function() {

	function createRequest() {
		var oHTTP = null;
		if (window.XMLHttpRequest) {
			oHTTP = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			oHTTP = new ActiveXObject("Microsoft.XMLHTTP");
		}
		return oHTTP;
	}

	function getHead(strURL, fncCallback, fncError) {
		var oHTTP = createRequest();
		if (oHTTP) {
			if (fncCallback) {
				if (typeof(oHTTP.onload) != "undefined") {
					oHTTP.onload = function() {
						if (oHTTP.status == "200") {
							fncCallback(this);
						} else {
							if (fncError) fncError();
						}
						oHTTP = null;
					};
				} else {
					oHTTP.onreadystatechange = function() {
						if (oHTTP.readyState == 4) {
							if (oHTTP.status == "200") {
								fncCallback(this);
							} else {
								if (fncError) fncError();
							}
							oHTTP = null;
						}
					};
				}
			}
			oHTTP.open("HEAD", strURL, true);
			oHTTP.send(null);
		} else {
			if (fncError) fncError();
		}
	}

	function sendRequest(strURL, fncCallback, fncError, aRange, bAcceptRanges, iFileSize) {
		var oHTTP = createRequest();
		if (oHTTP) {

			var iDataOffset = 0;
			if (aRange && !bAcceptRanges) {
				iDataOffset = aRange[0];
			}
			var iDataLen = 0;
			if (aRange) {
				iDataLen = aRange[1]-aRange[0]+1;
			}

			if (fncCallback) {
				if (typeof(oHTTP.onload) != "undefined") {
					oHTTP.onload = function() {

						if (oHTTP.status == "200" || oHTTP.status == "206") {
							this.binaryResponse = new BinaryFile(this.responseText, iDataOffset, iDataLen);
							this.fileSize = iFileSize || this.getResponseHeader("Content-Length");
							fncCallback(this);
						} else {
							if (fncError) fncError();
						}
						oHTTP = null;
					};
				} else {
					oHTTP.onreadystatechange = function() {
						if (oHTTP.readyState == 4) {
							if (oHTTP.status == "200" || oHTTP.status == "206") {
								this.binaryResponse = new BinaryFile(oHTTP.responseBody, iDataOffset, iDataLen);
								this.fileSize = iFileSize || this.getResponseHeader("Content-Length");
								fncCallback(this);
							} else {
								if (fncError) fncError();
							}
							oHTTP = null;
						}
					};
				}
			}
			oHTTP.open("GET", strURL, true);

			if (oHTTP.overrideMimeType) oHTTP.overrideMimeType('text/plain; charset=x-user-defined');

			if (aRange && bAcceptRanges) {
				oHTTP.setRequestHeader("Range", "bytes=" + aRange[0] + "-" + aRange[1]);
			}

			oHTTP.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 1970 00:00:00 GMT");

			oHTTP.send(null);
		} else {
			if (fncError) fncError();
		}
	}

	return function(strURL, fncCallback, fncError, aRange) {

		if (aRange) {
			getHead(
				strURL, 
				function(oHTTP) {
					var iLength = parseInt(oHTTP.getResponseHeader("Content-Length"),10);
					var strAcceptRanges = oHTTP.getResponseHeader("Accept-Ranges");

					var iStart, iEnd;
					iStart = aRange[0];
					if (aRange[0] < 0) 
						iStart += iLength;
					iEnd = iStart + aRange[1] - 1;

					sendRequest(strURL, fncCallback, fncError, [iStart, iEnd], (strAcceptRanges == "bytes"), iLength);
				}
			);

		} else {
			sendRequest(strURL, fncCallback, fncError);
		}
	}

}());


document.write(
	"<script type='text/vbscript'>\r\n"
	+ "Function IEBinary_getByteAt(strBinary, iOffset)\r\n"
	+ "	IEBinary_getByteAt = AscB(MidB(strBinary,iOffset+1,1))\r\n"
	+ "End Function\r\n"
	+ "Function IEBinary_getLength(strBinary)\r\n"
	+ "	IEBinary_getLength = LenB(strBinary)\r\n"
	+ "End Function\r\n"
	+ "</script>\r\n"
);


/*
 * JavaScript ID3 Tag Reader 0.1.2
 * Copyright (c) 2008 Jacob Seidelin, cupboy@gmail.com, http://blog.nihilogic.dk/
 * MIT License [http://www.opensource.org/licenses/mit-license.php]
 */

var ID3 = {};

(function() {

	ID3.genres = [
		"Blues","Classic Rock","Country","Dance","Disco","Funk","Grunge",
		"Hip-Hop","Jazz","Metal","New Age","Oldies","Other","Pop","R&B",
		"Rap","Reggae","Rock","Techno","Industrial","Alternative","Ska",
		"Death Metal","Pranks","Soundtrack","Euro-Techno","Ambient",
		"Trip-Hop","Vocal","Jazz+Funk","Fusion","Trance","Classical",
		"Instrumental","Acid","House","Game","Sound Clip","Gospel",
		"Noise","AlternRock","Bass","Soul","Punk","Space","Meditative",
		"Instrumental Pop","Instrumental Rock","Ethnic","Gothic",
		"Darkwave","Techno-Industrial","Electronic","Pop-Folk",
		"Eurodance","Dream","Southern Rock","Comedy","Cult","Gangsta",
		"Top 40","Christian Rap","Pop/Funk","Jungle","Native American",
		"Cabaret","New Wave","Psychadelic","Rave","Showtunes","Trailer",
		"Lo-Fi","Tribal","Acid Punk","Acid Jazz","Polka","Retro",
		"Musical","Rock & Roll","Hard Rock","Folk","Folk-Rock",
		"National Folk","Swing","Fast Fusion","Bebob","Latin","Revival",
		"Celtic","Bluegrass","Avantgarde","Gothic Rock","Progressive Rock",
		"Psychedelic Rock","Symphonic Rock","Slow Rock","Big Band",
		"Chorus","Easy Listening","Acoustic","Humour","Speech","Chanson",
		"Opera","Chamber Music","Sonata","Symphony","Booty Bass","Primus",
		"Porn Groove","Satire","Slow Jam","Club","Tango","Samba",
		"Folklore","Ballad","Power Ballad","Rhythmic Soul","Freestyle",
		"Duet","Punk Rock","Drum Solo","Acapella","Euro-House","Dance Hall"
	];

	var files = [];

	function readFileData(url, callback) {
		BinaryAjax(
			url,
			function(http) {
				var tags = readTagsFromData(http.binaryResponse);
				console.log(tags);
				files[url] = tags;
				if (callback) callback();
			},
			null,
			[-128, 128] // range = [start, length], -128 means length-128
		)
	}

	function readTagsFromData(data) {
		//var offset = data.getLength() - 128;
		console.log(data);
		var offset = 0;

		var header = data.getStringAt(offset, 3);
		if (header == "TAG") {
			var title = data.getStringAt(offset + 3, 30).replace(/\0/g, "");
			var artist = data.getStringAt(offset + 33, 30).replace(/\0/g, "");
			var album = data.getStringAt(offset + 63, 30).replace(/\0/g, "");
			var year = data.getStringAt(offset + 93, 4).replace(/\0/g, "");

			var trackFlag = data.getByteAt(offset + 97 + 28);
			if (trackFlag == 0) {
				var comment = data.getStringAt(offset + 97, 28).replace(/\0/g, "");
				var track = data.getByteAt(offset + 97 + 29);
			} else {
				var comment = "";
				var track = 0;
			}

			var genreIdx = data.getByteAt(offset + 97 + 30);
			if (genreIdx < 255) {
				var genre = ID3.genres[genreIdx];
			} else {
				var genre = "";
			}

			return {
				title : title,
				artist : artist,
				album : album,
				year : year,
				comment : comment,
				track : track,
				genre : genre
			}
		} else {
			return {};
		}
	}


	ID3.loadTags = function(url, cb) {
		console.log(cb);
		if (!files[url]) {
			readFileData(url, cb);
		} else {
			if (cb) cb();
		}
	}

	ID3.getAllTags = function(url) {
		if (!files[url]) return null;

		var tags = {};
		for (var a in files[url]) {
			if (files[url].hasOwnProperty(a))
				tags[a] = files[url][a];
		}
		return tags;
	}

	ID3.getTag = function(url, tag) {
		if (!files[url]) return null;

		return files[url][tag];
	}


})();

