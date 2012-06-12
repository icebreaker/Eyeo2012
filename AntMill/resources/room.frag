uniform vec3 eyePos;
uniform float power;
uniform float lightPower;
uniform vec3 roomDims;
uniform float timePer;

varying vec3 eyeDir;
varying vec4 vVertex;
varying vec3 vNormal;

void main()
{
	float aoLight		= 1.0 - length( vVertex.xyz ) * 0.00125;
	float aoDark		= aoLight * 0.1;
	
	float ceiling		= 0.0;
	if( vNormal.y < -0.5 ) ceiling = 1.0;
	
	float yPer = clamp( vVertex.y/roomDims.y, 0.0, 1.0 );
	float ceilingGlow	= pow( yPer, 2.0 ) * 0.25;
	ceilingGlow			+= pow( yPer, 200.0 );
	ceilingGlow			+= pow( max( yPer - 0.7, 0.0 ), 3.0 ) * 4.0;
	
	vec3 litRoomColor	= vec3( aoLight + ( ceiling + ceilingGlow * timePer ) * lightPower );
	vec3 darkRoomColor	= vec3( aoLight * 0.1 );
	
	gl_FragColor.rgb	= mix( litRoomColor, darkRoomColor, power );
	gl_FragColor.a		= 1.0;
}