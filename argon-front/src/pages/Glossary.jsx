import React from 'react';
import { Container, Grid, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  subtitle: {
    fontWeight: 500,
  }
}));

function Glossary() {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Typography className={classes.subtitle} variant="h4">Glossário:</Typography>
      <br />
      <Grid container spacing={3}>
        <Grid item>
          <Typography className={classes.subtitle} variant="subtitle1">HOMICIDIO DOLOSO</Typography>
          Crime contra a pessoa (vida) consistente em matar alguém.
          Tornou-se clássica a definição de que se trata de ocasião violenta de um homem
          contra outro homem com a intenção de matar.
          HOMICÍDIO DOLOSO POR ACIDENTE DE TRÂNSITO - Crime contra a pessoa (vida)
          consistente em matar alguém por via de acidentes de trânsito, com a intenção de
          matar.
        </Grid>
        
        <Grid item>
          <Typography className={classes.subtitle} variant="subtitle1">HOMICÍDIO CULPOSO POR ACIDENTE DE TRÂNSITO</Typography>
          O homicídio culposo ocorre
          quando uma pessoa tira a vida de outra sem a intenção, por negligência,
          imprudência ou imperícia por via de acidentes de trânsito.
        </Grid>
        
        <Grid item>
          <Typography className={classes.subtitle} variant="subtitle1"> HOMICÍDIO CULPOSO OUTROS</Typography>
          O homicídio culposo ocorre quando uma pessoa
          tira a vida de outra sem a intenção, por negligência, imprudência ou imperícia.
        </Grid>
        
        <Grid item>
          <Typography className={classes.subtitle} variant="subtitle1">TENTATIVA DE HOMICÍDIO</Typography>
          Ocorre quando o autor tem como objetivo tirar a vida de
          uma pessoa (ou várias), apesar de não haver conseguido.
        </Grid>
        
        <Grid item>
          <Typography className={classes.subtitle} variant="subtitle1">LESÃO CORPORAL SEGUIDA DE MORTE</Typography>
          É crime que consiste na ofensa à
          integridade física (corporal) ou à saúde de outrem (perturbações fisiológicas ou
          mentais na vítima), seguido de morte da vítima. Pode ser doloso ou culposo.
        </Grid>
        
        <Grid item>
          <Typography className={classes.subtitle} variant="subtitle1">LESÃO CORPORAL DOLOSA</Typography>
          É crime que consiste na ofensa à integridade física
          (corporal) ou à saúde de outrem (perturbações fisiológicas ou mentais na vítima)
          com intenção e prudência do autor.
        </Grid>
        
        <Grid item>
          <Typography className={classes.subtitle} variant="subtitle1">LESÃO CORPORAL CULPOSA POR ACIDENTE DE TRÂNSITO</Typography>
          É crime que consiste
          na ofensa à integridade física (corporal) ou à saúde de outrem (perturbações
          fisiológicas ou mentais na vítima) sem intenção, por negligência, imperícia ou
          imprudência do autor por vias de trânsito.
        </Grid>
        
        <Grid item>
          <Typography className={classes.subtitle} variant="subtitle1">LATROCÍNIO</Typography>
          homicídio com objetivo de roubo, ou roubo seguido de morte ou de graves
          lesões corporais da vítima.
        </Grid>
        
        <Grid item>
          <Typography className={classes.subtitle} variant="subtitle1">ESTUPRO</Typography>
          tipo de agressão sexual geralmente envolvendo relação sexual ou outras
          formas de atos libidinosos realizado contra uma pessoa sem o seu consentimento.
        </Grid>
        
        <Grid item>
          <Typography className={classes.subtitle} variant="subtitle1">ESTUPRO DE VULNERAVEL</Typography>
          tipo de agressão sexual geralmente envolvendo relação
          sexual ou outras formas de atos libidinosos realizado contra uma pessoa sem o seu
          consentimento, contra ferido, sujeito a ser atacado, derrotado: frágil, prejudicado ou
          ofendido.
        </Grid>
        
        <Grid item>
          <Typography className={classes.subtitle} variant="subtitle1">ROUBO</Typography>
          apropriação indébita de bem alheio.
        </Grid>
        
        <Grid item>
          <Typography className={classes.subtitle} variant="subtitle1">ROUBO DE VEÍCULO</Typography>
          apropriação indébita de veículo alheio.
        </Grid>
        
        <Grid item>
          <Typography className={classes.subtitle} variant="subtitle1">ROUBO A BANCO</Typography>
          apropriação indébita contra as instituições financeiras.
        </Grid>
        
        <Grid item>
          <Typography className={classes.subtitle} variant="subtitle1">ROUBO DE CARGA</Typography>
          apropriação indébita de bem alheio voltada a cargas movidas por
          transporte.
        </Grid>
        
        <Grid item>
          <Typography className={classes.subtitle} variant="subtitle1">FURTO</Typography>
          Subtração, ou seja, diminuição do patrimônio de outra pessoa, sem que haja
          violência.
        </Grid>
        
        <Grid item>
          <Typography className={classes.subtitle} variant="subtitle1">FURTO DE VEÍCULO</Typography>
          Subtração de veículo de outra pessoa, sem que haja violência.
          FEMINICIDIO - homicídio cometido contra mulheres que é motivado por violência doméstica
          ou discriminação de gênero.
        </Grid>
        
        <Grid item>
          <Typography className={classes.subtitle} variant="subtitle1">MAUS TRATOS</Typography>
          delito de quem submete alguém, sob sua dependência ou guarda, a
          castigos imoderados, trabalhos excessivos e/ou privação de alimentos e cuidados,
          pondo-lhe, assim, em risco a vida ou a saúde.
        </Grid>
        
        <Grid item>
          <Typography className={classes.subtitle} variant="subtitle1">CALUNIA/DIFAMACAO/INJURIA</Typography>
          afirmação falsa e desonrosa a respeito de alguém.
        </Grid>
        
        <Grid item>
          <Typography className={classes.subtitle} variant="subtitle1">CONSTRANGIMENTO ILEGAL</Typography>
          violência física ou moral exercida contra alguém; coação.
          AMEACA - fato, ação, gesto ou palavra que intimida ou atemoriza.
        </Grid>
        
        <Grid item>
          <Typography className={classes.subtitle} variant="subtitle1">INVASÃO DE DOMICÍLIO</Typography>
          Trata-se do crime perpetrado pela pessoa que entra ou
          permanece no domicílio de outrem de forma clandestina, contra a vontade ou sem a
          autorização de seu proprietário ou ocupante legítimo.
        </Grid>
        
        <Grid item>
          <Typography className={classes.subtitle} variant="subtitle1">DANO</Typography>
          prejuízo, ruína; estrago.
        </Grid>
        
        <Grid item>
          ESTUPRO CONSUMADO - Constranger alguém, mediante violência ou grave ameaça, a
          ter conjunção carnal ou a praticar ou permitir que com ele se pratique outro ato libidinoso.
        </Grid>
        
        <Grid item>
          <Typography className={classes.subtitle} variant="subtitle1">ESTUPRO TENTADO</Typography>
          Tentativa de estupro, quando o agente visa à conjunção carnal,
          mas não alcança o resultado por circunstâncias alheias à sua vontade.
        </Grid>
        
        <Grid item>
          <Typography className={classes.subtitle} variant="subtitle1">ESTUPRO DE VULNERAVEL CONSUMADO</Typography>
          Constranger alguém, mediante violência ou
          grave ameaça, a ter conjunção carnal ou a praticar ou permitir que com ele se pratique
          outro ato libidinoso contra ferido, sujeito a ser atacado, derrotado: frágil, prejudicado ou
          ofendido.
        </Grid>
        
        <Grid item>
          <Typography className={classes.subtitle} variant="subtitle1">ESTUPRO DE VULNERAVEL TENTADO</Typography>
          Tentativa de estupro, quando o agente visa à
          conjunção carnal, mas não alcança o resultado por circunstâncias alheias à sua vontade
          contra ferido, sujeito a ser atacado, derrotado: frágil, prejudicado ou ofendido.
        </Grid>
        
        <Grid item>
          <Typography className={classes.subtitle} variant="subtitle1">DIGNIDADE SEXUAL</Typography>
          Trata-se da condição humana nas relações sexuais, o respeito e
          preservação de sua faceta sexual, não sendo condizente a um Estado Democrático de
          Direito a sua exploração ou abuso, pelo fato do ser humano ser o fim último da sociedade.
        </Grid>
        
        <Grid item>
          <Typography className={classes.subtitle} variant="subtitle1">IMPEDIR ACESSO</Typography>
          dificultar a ação, tornar impraticável; estorvar com o objetivo de
          obstruir acessos públicos ou vias.
        </Grid>
        
        <Grid item>
          <Typography className={classes.subtitle} variant="subtitle1">NEGAR OU OBSTAR EMPREGO</Typography>
          criar embaraço ou obstáculo (a); servir de obstáculo (a)
          a assuntos empregatícios.
        </Grid>
        
        <Grid item>
          <Typography className={classes.subtitle} variant="subtitle1">PRATICAR DIFAMACAO</Typography>
          afirmação falsa e desonrosa a respeito de alguém.
          VIAS DE FATO - Trata-se de infração penal que ameaça a integridade física através da
          pratica de atos de ataque ou violência contra pessoa, desde que não resulte em lesões
          corporais.
        </Grid>
        
        <Grid item>
          <Typography className={classes.subtitle} variant="subtitle1">VIOLENCIA DOMESTICA</Typography>
          ação ou efeito de empregar força física ou intimidação moral
          contra; ato violento, dentro das acomodações domésticas.
        </Grid>
        
        <Grid item>
          <Typography className={classes.subtitle} variant="subtitle1">IDHM</Typography>
          medida composta de indicadores de três dimensões do desenvolvimento humano:
          longevidade, educação e renda. O índice varia de 0 a 1. Quanto mais próximo de 1, maior o
          desenvolvimento humano. Utiliza-se este índice para avaliar medidas dos indicadores a
          nível municipal.
        </Grid>
        
        <Grid item>
          <Typography className={classes.subtitle} variant="subtitle1">Tipo de intolerancia/ vitima</Typography>
          Racial\Etnia\Cor - atitude mental caracterizada pela falta de
          habilidade ou vontade em reconhecer e respeitar diferenças em raças, etnia ou cores.
        </Grid>
        
        <Grid item>
          <Typography className={classes.subtitle} variant="subtitle1">Tipo de intolerancia/ vitima</Typography>
          Religioso - atitude mental caracterizada pela falta de
          habilidade ou vontade em reconhecer e respeitar diferenças em crenças, opiniões e cunhos
          religiosos.
        </Grid>
        
        <Grid item>
          <Typography className={classes.subtitle} variant="subtitle1">Tipo de intolerancia/ vitima</Typography>
          Homofobia\Transfobia - atitude mental caracterizada pela
          falta de habilidade ou vontade em reconhecer e respeitar diferenças de gênero como
          homossexuais e transsexuais.
        </Grid>
        
        <Grid item>
          <Typography className={classes.subtitle} variant="subtitle1">Tipo de intolerancia/ vitima</Typography>
          Origem - atitude mental caracterizada pela falta de
          habilidade ou vontade em reconhecer e respeitar diferenças de vítimas, assim como seus
          depoimentos.
        </Grid>
        
      </Grid>
    </Container>
    );
}

export default Glossary;
