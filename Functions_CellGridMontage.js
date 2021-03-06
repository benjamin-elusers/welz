///---------------------------- JS FUNCTIONS FOR FIJI (NASHORN ENGINE) ----------------------------///
 IJSetup = function(){
	importClass(Packages.ij.IJ);
	importClass(Packages.ij.plugin.frame.RoiManager);
	importClass(Packages.ij.io.OpenDialog);
	importClass(Packages.ij.io.DirectoryChooser);
	importClass(Packages.ij.gui.GenericDialog);
	importClass(Packages.ij.util.Tools);
	importClass(Packages.ij.plugin.Duplicator);
	importClass(Packages.ij.measure.ResultsTable);
	importClass(Packages.ij.ImagePlus);
	importClass(Packages.ij.process.ImageProcessor);
	importClass(Packages.ij.util.ArrayUtil);
	importClass(Packages.ij.gui.Overlay);
	importClass(Packages.ij.plugin.filter.ParticleAnalyzer);
	importClass(Packages.ij.gui.Roi);
	importClass(Packages.ij.plugin.filter.Analyzer);
	importClass(Packages.ij.plugin.RGBStackMerge);
	importClass(Packages.ij.process.ImageConverter);
	importClass(Packages.ij.gui.OvalRoi);
	importClass(Packages.ij.WindowManager);
	importClass(Packages.ij.ImageStack);
	importClass(Packages.ij.gui.ProfilePlot);
	importClass(Packages.ij.gui.Line);
	importClass(Packages.ij.gui.Plot);
	importClass(Packages.ij.measure.CurveFitter);
	importClass(Packages.ij.plugin.frame.Fitter);
	importClass(Packages.ij.gui.PolygonRoi);
	importClass(Packages.ij.process.ImageStatistics);
	importClass(Packages.ij.measure.Measurements);
	importClass(Packages.java.io.File);
	importClass(Packages.java.io.FilenameFilter);
	importClass(Packages.java.io.IOException);
	importPackage(java.awt);
	importClass(Packages.ij.macro.Interpreter);
	MACRO = new Interpreter(); 
	IJ = IJ(); 
	IJ.setPasteMode("Copy");
	RM = RoiManager(true);// initiating the ROI manager in hidden mode.
	if (RM==null){ IJ.error("ROI Manager is not found"); }
	// activate batchmode (= setBatchMode(true) in IJ macro)
	MACRO.batchMode = true;
}

// PROTOTYPES METHODS 
// i.e. built-in functions from latest version of JavaScript which are not implemented in the JavaScript Rhino interpreter
Array.prototype.map = function(callback/*, thisArg*/){
    var T, A, k;
    if (this == null) { throw new TypeError('this is null or not defined'); }
    // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
    var O = Object(this);
    // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;
    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== 'function') { throw new TypeError(callback + ' is not a function'); }
    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (arguments.length > 1) { T = arguments[1]; }
    // 6. Let A be a new array created as if by the expression new Array(len) 
    //    where Array is the standard built-in constructor with that name and 
    //    len is the value of len.
    A = new Array(len);
    // 7. Let k be 0
    k = 0;
    // 8. Repeat, while k < len
    while (k < len) {
      var kValue, mappedValue;
      // a. Let Pk be ToString(k). // This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk. // This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {
        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
        kValue = O[k];
        // ii. Let mappedValue be the result of calling the Call internal method of callback with T as the this value and argument list containing kValue, k, and O.
        mappedValue = callback.call(T, kValue, k, O);
        // iii. Call the DefineOwnProperty internal method of A with arguments Pk, Property Descriptor
        //{ Value: mappedValue, Writable: true, Enumerable: true, Configurable: true }, and false.
        // In browsers that support Object.defineProperty, use the following:
        // Object.defineProperty(A, k, {value: mappedValue, writable: true, enumerable: true, configurable: true });
        // For best browser support, use the following:
        A[k] = mappedValue;
      }
      k++; // d. Increase k by 1.
    }
    return A; // 9. return A
}

Array.prototype.filter = function(func, thisArg) {
    'use strict';
    if ( ! ((typeof func === 'Function' || typeof func === 'function') && this) )
        throw new TypeError();
   
    var len = this.length >>> 0,
        res = new Array(len), // preallocate array
        t = this, c = 0, i = -1;

    var kValue;
    if (thisArg === undefined){
      while (++i !== len){
        // checks to see if the key was set
        if (i in this){
          kValue = t[i]; // in case t is changed in callback
          if (func(t[i], i, t)){
            res[c++] = kValue;
          }
        }
      }
    }
    else{
      while (++i !== len){
        // checks to see if the key was set
        if (i in this){
          kValue = t[i];
          if (func.call(thisArg, t[i], i, t)){
            res[c++] = kValue;
          }
        }
      }
    }
   
    res.length = c; // shrink down array to proper size
    return res;
}

Object.prototype.keys = function(obj) {
	'use strict';
    if ( ! ((typeof obj === 'Function' || typeof obj === 'function') && this) ){
      throw new TypeError('Object.keys called on non-object');
    }

    var result = [], prop, i;

    for (prop in obj) {
      if (hasOwnProperty.call(obj, prop)) { result.push(prop); }
    }

    if (hasDontEnumBug) {
      for (i = 0; i < dontEnumsLength; i++) {
        if (hasOwnProperty.call(obj, dontEnums[i])) { result.push(dontEnums[i]); }
      }
    }
    return result;
}

String.prototype.repeat = function(count) {
    'use strict';
    if (this == null) { throw new TypeError('can\'t convert ' + this + ' to object'); }
    var str = '' + this;
    count = +count;
    if(count != count){ count = 0; }
    if(count < 0){ throw new RangeError('repeat count must be non-negative'); }
    if(count == Infinity){ throw new RangeError('repeat count must be less than infinity'); }
    count = Math.floor(count);
    if(str.length == 0 || count == 0){ return ''; }
    // Ensuring count is a 31-bit integer allows us to heavily optimize the main part. 
    // But anyway, most current (August 2014) browsers can't handle strings 1 << 28 chars or longer, so:
    if(str.length * count >= 1 << 28){ throw new RangeError('repeat count must not overflow maximum string size'); }
    var rpt = '';
    for(;;){
      if ((count & 1) == 1) { rpt += str; }
      count >>>= 1;
      if (count == 0){ break; }
      str += str;
    }
    // Could we try:
    // return Array(count + 1).join(this);
    return rpt;
}

Array.prototype.indexOf = function indexOf(member, startFrom) {
    'use strict';
    /*
    In non-strict mode, if the `this` variable is null or undefined, then it is set to the window object.
    Otherwise, `this` is automatically converted to an object. 
    In strict mode, if the `this` variable is null or undefined, a `TypeError` is thrown.
    */
	if (this == null) { throw new TypeError("Array.prototype.indexOf() - can't convert `" + this + "` to object"); }

	var index = isFinite(startFrom) ? Math.floor(startFrom) : 0,
	    that = this instanceof Object ? this : new Object(this),
	    length = isFinite(that.length) ? Math.floor(that.length) : 0;

	if (index >= length){ return -1; }
	if (index < 0) { index = Math.max(length + index, 0); }

	if (member === undefined) {
		/* Since `member` is undefined, keys that don't exist will have the same value as `member`, and thus do need to be checked. */
	  do{
	    if (index in that && that[index] === undefined) { return index; }
	  }while (++index < length);
	}else{
	  do{
	  	if (that[index] === member) { return index; }
	  }while (++index < length);
	}
	return -1;
}

// Generic functions

function ERRORexit(msg){ IJ.log(msg); java.lang.System.exit(-1); }
function isNumeric(value) { // returns true if value is numeric and false if it is not.
	var NumRegexp = /^(-)?(\d+)(\.?)(\d*)$/; 
	return String(value).match(RegExp);
}
function isUndefined(value){ return value === void(0); }
function isEmpty(str) { return str === ''; }
function notEmpty(str) {  return str !== ''; }
function isInt(n){ return Number(n) === n && n % 1 === 0; }
function dirname(str, sep){ return str.substr(0,str.lastIndexOf(sep)); }
function basename(str, sep){ return str.substr(str.lastIndexOf(sep) + 1); }
function stripext(str) { return str.substr(0,str.lastIndexOf('.')); }
function getext(str) { return str.substr(str.lastIndexOf('.')+1); }
// path = '/media/elusers/users/benjamin/A-PROJECTS/01_PhD/04-image-analysis/JS4Fiji/test-CellGridMontage.input';
// print("DIR is "+dirname(path,'/'));
// print("FILE is "+basename(path,'/'));
// print("FILENAME is "+stripEXT(basename(path,'/')));
// print("EXTENSION is "+getEXT(path));

function sortArr(Arr,asc){
	var sorted = Arr.slice(0);
	if( asc === undefined ){
		// It returns the sorted array in ascending order.
	    sorted.sort(function(a, b){return a-b}); 
	    return sorted;
	}else{
		// It returns the sorted array in descending order.
	    sorted.sort(function(a, b){return b-a}); 
	    return sorted;
	}
}

function seqD(start,end,delta){
	var Arr = new Array();
	if(delta == 0 ){ return(Arr) }
	if( start > end ){ return(Arr) }
	if(delta < 0 ){ delta = -delta; }
	if( delta > end-start ){ delta = end; }
	for (var i = start; i < end+1; i+=delta){ Arr.push(i); }
	return(Arr)
}
//vec = new Array(2,3,5,6,9,17,21,22,23,25,28,29,30,31,33,37,39,41,42,44,45,46,47,48,50,51,54,56,57,62,63,65,66,69,70,72,73,74,75,76,77,78,79,81,86,88,89,90,91,92,93,94,95,102,105,106,107,108,112,113,114,116,117,120,121,122,123,124,125,126,128,129,132,134,135,137,138,141,142,145,146,149,152,155,156,157,158,161,163,167,169,171,172,173,174,175,176,178,179,182,183,184,185,186,188,190,191,193,194,195,197,198,199);
function seqL(start,end,len){
	var Arr = new Array();
	if( len<1 ){ return(Arr) }
	if( start > end ){ return(Arr) }
	if( end < len ){ len = end; }
	var delta = (end-start) / (len-1) ;
	var nval=0;
	for (var i = start; i <= end-delta && nval < len-1; i+=delta){ Arr.push(Math.floor(i)); nval++; }
	Arr.push(Math.floor(end-1));
	return(Arr)
}
//print(vec.length);
//print( seqL(0,vec.length,32) );
//ivec=seqL(0,vec.length,32);
function subset(Arr,ind){
	var sub = new Array();
	for(var i=0; i<ind.length; i++){ 
		if(i<Arr.length){ sub.push(Arr[ind[i]]); }
		else{ IJ.log("index "+ind[i]+" out of bounds !"); }
	}
	return(sub);
}
//print(subset(vec,ivec));
// returns true if the object passed is an integer

VERBMAX = 0; // MAXIMUM VERBOSITY (all messages are displayed)
function display(verbosity,msg){
	// verbosity level:
	//  0   = debug
	//  1-2 = low-level information 
	//  3-4 = progress update 
	//  5   = input parameter
	//  >5  = always
	if( verbosity >= VERBMAX ){
		IJ.log(msg);
	}
}

// Montage Functions
function cell() { 
// Constructor for any type of ROI. 
    this.idx    = null;
    this.type   = null;
    this.ROIobj = null; // ImageJ's Roi type object corresponding to this Roi.
    this.area   = null;
    this.x      = null;
    this.y      = null;

    this.toString = function () {
		var str = "idx: " + this.idx +" ROIobj: " + this.ROIobj + " , area: " + this.area + " , xVal: " + this.x + " , yVal: " + this.y +" type: " + this.type; 
		return(str);
    }

	this.getStats = function(imp,ip){
		imp.setRoi(this.ROIobj, false);
		ip.setRoi(this.ROIobj);
		var stats = ip.getStatistics();
	   	return stats;
	}
	
	this.measureROI = function(imp,ip,strStatsFld) {
	// Performs a measurement on an image. Takes as arguments: The roi object, the imageprocessor object, and the imagestatistics string field telling the function what to measure.
	// It returns the value that was measured.
		imp.setRoi(this.ROIobj,false);
		ip.setRoi(this.ROIobj);
		var stats = ip.getStatistics();
		var val = stats[strStatsFld];
	    return val;
	}
}


function initMontageParams(){
	var M={};
	M['makePLATE']    = false;
	M['skipFIRSTPIC'] = false;

	M['BITMODE']      = '8-bit';
	M['BACKGROUND']   = 'black';
	M['PICPERWELL']   = 8;
	/// DONT MODIFY UNLESS YOUR PLATE FORMAT IS DIFFERENT FROM 384
	M['PLATEROWS']    = 16;
	M['PLATECOLS']    = 24;
	/// DONT MODIFY UNLESS YOU TO ALLOW FOR BIGGER CELLS, MORE CELLS PER WELLS
	//-- This will increase the size of the image and greatly slow down imageJ when observing the montage --//
	M['pxBORDER']     = 50;  // TOP & LEFT MARGIN IN PIXELS FOR THE MONTAGE
	M['pxCELL']       = 65;  // SIZE IN PIXEL FOR CROPPING CELLS
	M['CELLPERSIDE']  = 15;  // NUMBER OF CELLS PER SIDE OF A WELL

	M['FILENAME'] = "montage";
	return(M);
}

function updateMontageParams(M){

	M['PLATEFORMAT'] = M['PLATEROWS']*M['PLATECOLS'];
	M['CELLPERWELL'] = M['CELLPERSIDE']*M['CELLPERSIDE']; // MAXIMUM NUMBER OF CELLS PER WELL (225)
	M['CELLPERPIC']  = Math.floor( M['CELLPERWELL'] / (M['PICPERWELL']-M['skipFIRSTPIC']) ) + 1; // MAXIMUM NUMBER OF CELLS PER PICTURE
	
	M['WELLSIDE']    = M['CELLPERSIDE']*M['pxCELL'];
	M['WIDTH']       = M['pxBORDER']+(M['PLATECOLS']*M['WELLSIDE']);
	M['HEIGHT']      = M['pxBORDER']+(M['PLATEROWS']*M['WELLSIDE']);

	return(M);
}

function getMontageAllParams(M){
	var sharp = '#';
	var plateSTR = "";
	var gridSTR = "";
	// PRINTING MONTAGE PARAMETERS
	plateSTR+="YOUR PLATE MONTAGE WILL BE IN FORMAT : "+M['PLATEFORMAT']+" wells ("+M['PLATEROWS']+"rows x "+M['PLATECOLS']+"cols)\n";
	plateSTR+="==> in pixel unit : Width = " + M['WIDTH'] + " px.  Height = "+M['HEIGHT']+" px.\n";
	plateSTR+="In addition, borders of "+M['pxBORDER']+" px. will be drawn on the left and top side of the plate\n";
	display(5,sharp.repeat(80)+"\n" + plateSTR);
	
	gridSTR+="AT MOST, "+M['CELLPERPIC']+" CELLS WILL BE TAKEN FROM EACH WELL PICTURE\n";
	gridSTR+="EACH CELL WILL BE CONTAINED IN A SQUARE IMAGE OF "+M['pxCELL']+" px.\n";
	gridSTR+="EACH GRID WILL HAVE AT MOST "+M['CELLPERWELL']+" cells ("+M['CELLPERSIDE']+" cells per side)\n";
	display(5,sharp.repeat(80)+"\n" + gridSTR);

}
//IJ.log("EXAMPLE getMontageAllParam(MONTAGE)");
//getMontageAllParams(MONTAGE);

function getMontageParam(mon,par){
	var retSTR = "";
	if( par in mon ){
		retSTR+="PARAMETER '"+par+"' VALUE = "+mon[par];
	}else{
		retSTR+=("PARAMETER '"+par+"' NOT FOUND!");
	}
	return(retSTR);
}
//IJ.log("EXAMPLE getMontageParam(MONTAGE,'CELLPERPIC')");
//getMontageParam(MONTAGE,"CELLPERPIC");

function setMontageParam(mon,par,val){
	var retSTR = "";
	if( par in mon ){
		//retSTR+="BEFORE : "+getMontageParam(mon,par);
		retSTR+="SETTING "+getMontageParam(mon,par)+" TO "+val;
		mon[par] = val;
		//retSTR+="AFTER  : "+getMontageParam(mon,par);
		
	}else{
		retSTR +="PARAMETER '"+par+"' NOT FOUND!";
	}
	display(4,retSTR);
}
//IJ.log("EXAMPLE setMontageParam(MONTAGE,'CELLPERPIC',15)")
//setMontageParam(MONTAGE,"CELLPERPIC",15);

function Well2pos(w,M,debug){
	
	var regexWell = new RegExp('^([A-P])(0[1-9]|1[0-9]|2[0-4])$');
	var arrayWell = regexWell.exec(w);

	if( arrayWell === null){ 
		IJ.log(w+" is not a valid well.") 
		return(null);
	}
 	
 	row=LETTERS.indexOf(arrayWell[1]);
	col=COLS.indexOf(arrayWell[2]);
	if( row === null ){	IJ.log(arrayWell[1] + " not a valid ROW in the "+M['PLATEFORMAT']+" well plate.");	}
	if( col ===  null ){ IJ.log(arrayWell[2] + " not a valid COLUMN in the "+M['PLATEFORMAT']+" well plate.");	} 
	
	var wellpos = {};
	wellpos['name'] = w;
	wellpos['row'] = LETTERS[row];
	wellpos['col'] = COLS[col];
	wellpos['x']   = M['pxBORDER'] + col*M['WELLSIDE'];
	wellpos['y']   = M['pxBORDER'] + row*M['WELLSIDE'];

	if( row !== null  & col !== null & debug !== undefined ){
		display(1,"WELL  string      : "+wellpos['name']);
		display(1,"Plate coordinates : row = "+row+" ( "+wellpos['row']+" ) "+" col = "+col+" ( "+wellpos['col']+" )");
		display(1,"Pixel coordinates : x= "+wellpos['x']+" y="+wellpos['y']);
	}
	
	return(wellpos);
}

function tabRow (idx,P,W,O,C0,C1) {
  this.index = idx;
  this.plate = String(P);
  this.well = String(W);
  this.orf =  String(O);
  this.c0 = File(C0);
  this.c1 = File(C1);
  this.c2 = File(null);
  this.c3 = File(null);
}

function tabRow (idx,P,W,O,C0,C1,C2) {
  this.index = idx;
  this.plate = String(P);
  this.well = String(W);
  this.orf =  String(O);
  this.c0 = File(C0);
  this.c1 = File(C1);
  this.c2 = File(C2);
  this.c3 = File(null);
}

function tabRow (idx,P,W,O,C0,C1,C2,C3) {
  this.index = idx;
  this.plate = String(P);
  this.well = String(W);
  this.orf =  String(O);
  this.c0 = File(C0);
  this.c1 = File(C1);
  this.c2 = File(C2);
  this.c3 = File(C3);
}

tabRow.prototype.toString = function tabRow2String() {
  var ret = 'row=' + this.index + '\n-> plate=' + this.plate + '\n-> well=' + this.well + '\n-> orf=' + this.orf + '\n-> c0=' + this.c0+ '\n-> c1=' + this.c1+ '\n-> c2=' + this.c2+ '\n-> c3=' + this.c3;
  return ret;
}

function rmNA(str){
	if( str == "NA" ){ str=""; }
	return str;
}

function openTable(filepath,sep,header){
	//IJ.log("Opening tabulated file : ");
	//IJ.log(filepath);
	var fileContent = IJ.openAsString(filepath);
	var lines = fileContent.split("\n");
	
	var names = seqD(1,lines[0].split(sep).length,1);
	//IJ.log("Default column names : "+names);
	if(header==true){  names = lines[0].split(sep); }
	var table = new Array();
	var cellid = new Array();
	IJ.log("Columns of tabulated file are : "+names.join(' '));

	var input = {};
	input['fields'] = names;
	for( var n=0+(header==true); n<lines.length; n++){
		columns = lines[n].split(sep);
		record = new tabRow(n,rmNA(columns[0]),rmNA(columns[1]),rmNA(columns[2]),rmNA(columns[3]),rmNA(columns[4]),rmNA(columns[5]),rmNA(columns[6]));
		display(0,record.toString());
		if(columns.length > 6){
			ROIcol = rmNA(columns[7]);
		  if( !isUndefined(ROIcol) && notEmpty(ROIcol) ){
		 	cellroi  = ROIcol.toString();
		 	cellid.push(cellroi);
		 }else{
		 	display(2,"-> NO CELLS AT ROW "+n);
		 	cellroi = "";
		 	cellid.push(cellroi);
		 }
		}
//		for( var c=0; c<names.length; c++ ){
//			hash[names[c]] = columns[c]; 
//		}
		table.push(record);
	  
	}
	IJ.log("Tabulated file contained "+(lines.length-header)+" lines with data (except header)");
	input['data'] = table;
	input['ROI'] = cellid
	return(input);
}

function initRM(){
	if(RM==null){ RM = RoiManager(); }
	RM.reset();
}

function initCopyStatus(x0,y0){
	var status = {};
	status['channel'] = undefined;
	status['ROWINPUT'] = 1;
	status['FIRSTWELL'] = true;
	status['LASTROW'] = false;
	status['picno'] = 1;
	status['Xpos'] = x0;
	status['Ypos'] = y0;
	status['well'] = undefined;
	status['orf'] = undefined;
	status['NCELLS'] = 0;
	status['KEPT']   = 0;
	status['COPIED'] = 0;
	status['CELLCOPIED'] = 0;
	status['xcellgrid']  = 0;
	status['ycellgrid']  = 0;
	status['MAXINT'] = 0;
	status['COPY']   = true;
	return(status);
}


function NextWell(lastVal, currentVal,M,S,O){
	// CHECK IF WELL HAS BEEN VISITED
	
	display(3,"(0) Check if well changed");
	var nextwell = (lastVal !== currentVal);
	if(lastVal !== undefined ){ S['FIRSTWELL'] = false; }
	if( nextwell ){
		display(2,dash.repeat(100));
		if( S['FIRSTWELL'] == false ){
			display(2,"== Going to next well : "+nextwell+" == ");
			display(2,"Previous well #"+lastVal+"#");
		}
		display(2,"Current well #"+currentVal+"#");
		var W = Well2pos(currentVal,M,true);
		display(2,dash.repeat(100));

		S['ROWINPUT']++;
		S['picno'] = 1;
		S['Xpos']  = W['x'];
		S['Ypos']  = W['y'];
		S['well']  = W['name'];
		S['orf']  = O;
		S['COPY'] = true;
		S['MAXCOPY'] = false;
		S['SAVED'] = false;
		
		S['TOTALCELLS'] = 0;
		S['NCELLS']     = 0;
		S['NKEEP']      = 0;
		S['CELLCOPIED'] = 0;
		S['LEFT2COPY']  = M['PICPERWELL'];  
		S['NDROP']      = 0;

		S['xcellgrid']  = 0;
		S['ycellgrid']  = 0;
		nextwell=false;
	}else{
		display(3,dash.repeat(10)+"[PICNUM = "+S['picno']+"]"+dash.repeat(10));
	}
}

function FinishedWell(W, t0 ){
	var t1 = new Date().getTime();
	display(3,"PROCESSING WELL " + W + " TOOK : " + Math.round((t1-t0)) + " milliseconds");
}

function Overlay2Cells(overlays, imp, ip){ 
	var cells = new Array();
	for( var iroi=0; iroi < overlays.size(); iroi++){
		ROI = overlays.get(iroi);
		if( ROI === null ){ IJ.log("THIS OVERLAY (num="+(iroi)+") DOES NOT EXISTS !"); continue; }
		var Cell = new cell();
		Cell.type = "cell";
		Cell.ROIobj = ROI; 
		Cell.idx = iroi;
		Cell.area = Cell.measureROI(imp,ip,"area");
		Cell.x = Cell.measureROI(imp,ip,"xCenterOfMass");
		Cell.y = Cell.measureROI(imp,ip,"yCenterOfMass");
		cells.push(Cell);
	}
 	return(cells);
}

function getImageSegmented(segIMG){
	display(3,"(1.a) Open segmented image");
	var cellimp = null;
	var msg =  "Path to image with segmented cells : " + segIMG;
	if( !segIMG.exists() ){ 
		IJ.log(msg +" [FILE NOT FOUND]"); 
	}
	var cellimp = IJ.openImage(segIMG);
	return(cellimp);
}

function getCells(imp){
	display(3,"(1.b) Retrieve overlays in segmented image and convert to cell ROIs");
	var cells = new Array();
	var ip = imp.getProcessor();
	var overlays = imp.getOverlay(); // Get the cell overlays from the image with segmented cells
	imp.show();
  	if( overlays !== null ){ cells = Overlay2Cells(overlays,imp,ip); }
	imp.close();
	return(cells);
}

function getSelectedCells(cells,rois){
	var mycells = new Array();
	
	var cells0 = cells.map(function(c){return (c.idx);}); // Cell indices (STARTS AT 0)
	var cellids = cells0.map(function(v){ return (v+1)}); // Cell identifiers (STARTS AT 1)
	display(1,"Cells ids are: "+cellids);

	if( cells0.length > 0){
    	display(2,"==> The following ROIs are going to be selected :"+rois.join("-"));
		rois0 = rois.map(function(v){ return (v-1)}); // Make ROIS start 0
				
		var mycells = cells.filter(function (eachElem, index) { return rois0.indexOf(index) != -1});
		//display(1,"selected cells ("+mycells.length+") :"+mycells);
		if( mycells.length > 0){
			dropped = cells.length - mycells.length;
	    	display(2,"=> Number of cells : selected = "+mycells.length+"  dropped = "+dropped+"  (total = "+(cells.length)+")");
			return(mycells);	  	
		}else{      
		  	IJ.log("WARNING! None of the "+(ROIS.length)+" selected cells were found.");
		  	IJ.log("-------> All the existing segmented cells ("+cells.length+") will be considered.");
		  	for(var j=0; j<cells.length; j++){ display(0,cells[j].toString() );}
		  	return(cells);
		}
	}else{
		IJ.log("[ERR404]: NO SEGMENTED CELLS FOUND!");
		return(new Array());
	}
}

function getCellSelection(selfile,S){
	if(File(selfile).exists()){
		var fileContent = IJ.openAsString(selfile);
		var lines = fileContent.split("\n");
	}else{
		IJ.log("NO PRESELECTION OF CELLS");
	}
}


function copyROI(from, xroi, yroi, width, height, bit){

	// COPY CELL ROI FROM WELL PICTURE
	IJ.selectWindow(from.getTitle());
	IJ.makeRectangle(Math.floor(xroi-width/2), Math.floor(yroi-height/2), width, height);
	IJ.run(from,"Copy","");

	// #### PASTE TO MONTAGE 8-BIT IMAGE (THROUGH TEMPORARY 8-BIT IMAGE)  ####
	// CREATE A TEMPORARY IMAGE OF CELL SIZE
	TMP = IJ.createImage("TMP",bit,width+1,height+1,1);
	TMP.show();
	// PASTE THE CELL IN THE TEMPORARY 8-bits IMAGE
	IJ.selectWindow("TMP");
	tmpROI = new Roi(1,1,width,height);
	TMP.setRoi( tmpROI );
	IJ.run(TMP,"Paste","");

	return(TMP);
}

function addLabel(to,width,height,text,strokecolor,strokewidth){
	IJ.selectWindow(to.getTitle());
	var wellROI = new Roi(0,0,width,height);
	wellROI.setStrokeWidth(strokewidth);
	wellROI.setStrokeColor(strokecolor);
	wellROI.setName(text);
	RM.addRoi(wellROI);
}

function makeCellGrid(GRID,IMG,C,M,S,D){
	display(3,"(3) Crop and tile cells from current well image to cell grid");
	var wellLABELS = new Overlay();
	var cellLABELS = new Overlay();	
	
	// START COPYING CELLS IN CURRENT CHANNEL
	if( S['COPY'] && ( !S['MAX_COPY'] && S['picno'] <= M['PICPERWELL'] ) ){
	  	IMP = IJ.openImage(IMG);
	  	if(IMP !== null){ 
	  		IMP.show();
	  		IP = IMP.getProcessor();
	  	}else{
	  		return(null);
	  	}
		IJ.run(IMP, "Gaussian Blur...", "sigma=1.00");
		IJ.run(IMP, "Subtract Background...", "rolling=50");
	  	IJ.run(IMP, "Enhance Contrast", "saturated=0.35");
	  	
		var LEFT = Left2copy(S,M);
  		for( icell=0; icell < C.length && S['COPY'] && LEFT > 0 ; icell++){
		  	//IJ.log("SELECTED CELL INDEX IN PIC "+ipic+" : "+indCellPIC+" (nCells = "+nover+" kept="+nkept+" arrayL = "+CELLS.length+")");
		  	var stats = C[icell].getStats(IMP,IP);
		  	if(stats.max > S['MAXINT']){  S['MAXINT']=stats.max; }

			var localX = S['xcellgrid']*M['pxCELL'];
			var localY = S['ycellgrid']*M['pxCELL'];

			var TMP = copyROI(IMP,C[icell].x,C[icell].y,M['pxCELL'],M['pxCELL'],M['BITMODE']);
			// COPY THE TMP CELL IMAGE FROM 8bits
			IJ.run(TMP,"Copy","");
			TMP.changes = false; // No "save changes" dialog
			TMP.close();

			// PASTE IT TO ROI ON GRID
			IJ.selectWindow(GRID.getTitle());
			cellROI = new Roi(localX, localY, M['pxCELL'], M['pxCELL']);
			if( icell == C.length-1 ){
				cellROI.setStrokeWidth(0.2);
				cellROI.setStrokeColor(Color.blue);
			}else{
				cellROI.setStrokeWidth(0.1);
				cellROI.setStrokeColor(Color.gray);
			}
			cellROI.setName(C[icell].idx);
			RM.addRoi(cellROI);
			//cellLABELS.add(cellROI,C[icell].idx); // CELL LABEL
			//cellLABELS.setLabelColor(Color.white);
			//IJ.run("To ROI Manager", "");
			GRID.setRoi(cellROI);
			IJ.run(GRID,"Paste","");
			S['xcellgrid']++;
			if(S['xcellgrid'] == M['CELLPERSIDE']){
				S['xcellgrid']=0;
				S['ycellgrid']++;	
			}
			S['CELLCOPIED']++;
			display(2,"NUMBER OF CELLS COPIED = "+S['CELLCOPIED']+"/"+M['CELLPERWELL']+" +++ LEFT2COPY = "+LEFT);
			LEFT = Left2copy(S,M);
			
		}
	    IMP.changes=false;
	    IMP.close();
  	}
  	
 	if( S['picno'] == M['PICPERWELL'] || S['LASTROW'] || S['MAXCOPY'] ){
 		addLabel(GRID,M['WELLSIDE'],M['WELLSIDE'],S['well']+"_"+S['orf'],Color.yellow,2);
		RM.moveRoisToOverlay(GRID);
		IJ.run("Show Overlay", "");
		IJ.run("Labels...", "font=18 show use bold");
		saveCellGrid(GRID,M,S,D);
 	}
}

function saveCellGrid(GRID,M,S,D){
	underscore="_";
	if(S['SAVED'] == false){
		var FINALNAME = M['FILENAME'] + "-" + GRID.getTitle();
		display(2,underscore.repeat(20));
		display(4,"[SAVING CELL GRID] FILENAME IS "+FINALNAME);
		display(4,"PICNUM="+S['picno'] + " PIC PER WELL " + M['PICPERWELL']+" CH = "+S['channel'] );
		display(4,"WELL "+S['well']+" PLATE COORDINATES X="+S['Xpos']+" Y="+S['Ypos']+" ( PICNUM "+S['picno']+")");		
		display(4,"TOTAL CELLS = "+S['TOTALCELLS']+" (COPIED="+S['CELLCOPIED']+")");
		S['NDROP'] = S['TOTALCELLS']-S['CELLCOPIED'];
	 	IJ.saveAs(GRID, "Tiff", D + '/' + FINALNAME);
		GRID.changes=false;
		S['picno']=1; S['SAVED'] = true;
		GRID.close();
		display(2,underscore.repeat(20));
		display(2,space.repeat(100));
	}else{
		display(4,"[SAVING CELL GRID] /!\\ THIS CELL GRID SHOULD HAVE BEEN SAVED ALREADY /!\\ ");
	}
}

function Left2copy (S,M){
	var LEFT = M['CELLPERWELL'] - S['CELLCOPIED'];
	if( LEFT <= 0 ){ S['MAXCOPY']=false; S['COPY']=false; }
	return( LEFT )
}

IJSetup();

