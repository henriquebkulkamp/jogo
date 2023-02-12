export function VerificarVitoria(casa) {
    if (casa.a.player == casa.b.player && casa.b.player == casa.c.player  && casa.b.player == 'player1') { return 'player1' }
    if (casa.d.player == casa.e.player && casa.e.player == casa.f.player  && casa.e.player == 'player1') { return 'player1' }
    if (casa.g.player == casa.h.player && casa.h.player == casa.i.player  && casa.h.player == 'player1') { return 'player1' }
    if (casa.a.player == casa.d.player && casa.d.player == casa.g.player  && casa.d.player == 'player1') { return 'player1' }
    if (casa.b.player == casa.e.player && casa.e.player == casa.h.player  && casa.e.player == 'player1') { return 'player1' }
    if (casa.c.player == casa.f.player && casa.f.player == casa.i.player  && casa.f.player == 'player1') { return 'player1' }
    if (casa.a.player == casa.e.player && casa.e.player == casa.i.player  && casa.e.player == 'player1') { return 'player1' }
    if (casa.c.player == casa.e.player && casa.e.player == casa.g.player  && casa.e.player == 'player1') { return 'player1' }

    if (casa.a.player == casa.b.player && casa.b.player == casa.c.player  && casa.b.player == 'player2') { return 'player2' }
    if (casa.d.player == casa.e.player && casa.e.player == casa.f.player  && casa.e.player == 'player2') { return 'player2' }
    if (casa.g.player == casa.h.player && casa.h.player == casa.i.player  && casa.h.player == 'player2') { return 'player2' }
    if (casa.a.player == casa.d.player && casa.d.player == casa.g.player  && casa.d.player == 'player2') { return 'player2' }
    if (casa.b.player == casa.e.player && casa.e.player == casa.h.player  && casa.e.player == 'player2') { return 'player2' }
    if (casa.c.player == casa.f.player && casa.f.player == casa.i.player  && casa.f.player == 'player2') { return 'player2' }
    if (casa.a.player == casa.e.player && casa.e.player == casa.i.player  && casa.e.player == 'player2') { return 'player2' }
    if (casa.c.player == casa.e.player && casa.e.player == casa.g.player  && casa.e.player == 'player2') { return 'player2' }
    return null
}