<template>
    <div id="background-wrap">
        <div class="x1">
            <div class="cloud"></div>
        </div>
        <div class="x3">
            <div class="cloud"></div>
        </div>
        <div class="x5">
            <div class="cloud"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MyClouds'
}
</script>

<style scoped>
@-webkit-keyframes animateCloud {
    0% {
        margin-left: -800px;
    }
    100% {
        margin-left: 100%;
    }
}

@-moz-keyframes animateCloud {
    0% {
        margin-left: -800px;
    }
    100% {
        margin-left: 100%;
    }
}

@keyframes animateCloud {
    0% {
        margin-left: -800px;
    }
    100% {
        margin-left: 100%;
    }
}

/* ANIMATIONS */

.x1 {
	-webkit-animation: animateCloud 35s linear infinite;
	-moz-animation: animateCloud 35s linear infinite;
	animation: animateCloud 35s linear infinite;
	
	-webkit-transform: scale(0.65);
	-moz-transform: scale(0.65);
	transform: scale(0.65);
}


.x3 {
	-webkit-animation: animateCloud 20s linear infinite;
	-moz-animation: animateCloud 20s linear infinite;
	animation: animateCloud 20s linear infinite;
	
	-webkit-transform: scale(0.5);
	-moz-transform: scale(0.5);
	transform: scale(0.5);
}


.x5 {
	-webkit-animation: animateCloud 28s linear infinite;
	-moz-animation: animateCloud 28s linear infinite;
	animation: animateCloud 28s linear infinite;
	
	-webkit-transform: scale(0.55);
	-moz-transform: scale(0.55);
	transform: scale(0.55);
}

/* OBJECTS */

.cloud {
	background: #3fa4d7;
	background: -moz-linear-gradient(top,  #3fa4d7 0%, #455EB5 100%);
	background: -webkit-gradient(linear, left top, left bottom, color-stop(5%,#3fa4d7), color-stop(100%,#455EB5));
	background: -webkit-linear-gradient(top,  #3fa4d7 0%,#455EB5 100%);
	background: -o-linear-gradient(top,  #3fa4d7 0%,#455EB5 100%);
	background: -ms-linear-gradient(top,  #3fa4d7 0%,#455EB5 100%);
	background: linear-gradient(top,  #3fa4d7 0%,#455EB5 100%);
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3fa4d7', endColorstr='#455EB5',GradientType=0 );
	
	-webkit-border-radius: 100px;
	-moz-border-radius: 100px;
	border-radius: 100px;
	
	-webkit-box-shadow: 0 8px 5px rgba(0, 0, 0, 0.1);
	-moz-box-shadow: 0 8px 5px rgba(0, 0, 0, 0.1);
	box-shadow: 0 8px 5px rgba(0, 0, 0, 0.1);

	height: 120px;
	position: relative;
	width: 350px;
}

.cloud:after, .cloud:before {
    background: #3fa4d7;
	content: '';
	position: absolute;
	z-indeX: -1;
}

.cloud:after {
	-webkit-border-radius: 100px;
	-moz-border-radius: 100px;
	border-radius: 100px;

	height: 100px;
	left: 50px;
	top: -50px;
	width: 100px;
}

.cloud:before {
	-webkit-border-radius: 200px;
	-moz-border-radius: 200px;
	border-radius: 200px;

	width: 180px;
	height: 180px;
	right: 50px;
	top: -90px;
}
</style>