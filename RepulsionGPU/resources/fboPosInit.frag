uniform sampler2D initTex;

void main()
{
	vec4 initCol = texture2D( initTex, gl_TexCoord[0].st );
	vec4 wipeCol = initCol;

	gl_FragData[0] = initCol;
	gl_FragData[1] = wipeCol;
}