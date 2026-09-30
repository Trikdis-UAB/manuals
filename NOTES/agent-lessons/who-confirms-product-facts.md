# Who confirms which product facts

Written 2026-09-30, from working ATPR3I05-516 (the RL25 page).

Writing a manual keeps hitting the same wall: a fact nobody has written down, and no
obvious person to ask. Asking the wrong one costs a round trip and makes the question look
careless. This is the map, learned the slow way.

## The split

**Aleksejus Tkačiovas — software.** IPcom itself, the web interface, what the product does
and how it behaves. He owns the `ipcc_web` source and answers precisely. He will say
plainly when something is outside his area rather than guess, so a hardware question sent
to him costs a day.

**Vytautas Petrovas — product and commercial.** What is sold, in which variants, what is in
the box, licensing, and whether a documentation change meets what was asked for. He answers
from product knowledge and will flag when he is recalling rather than reading a spec — take
that hedging at face value and mark the doc accordingly.

**Saulius Sakalauskas — PCB design and production documentation.** The physical device:
dimensions, weight, rack units, connectors, operating temperature, materials, what is
actually fitted inside. If a fact is about the object rather than the software or the
commercial offer, it is his. Both of the others will point at him for these.

Account ids are one `lookupJiraAccountId` call away — look them up rather than storing them
here, and use a real mention so the person is actually notified.

## What this changes about how to ask

Sort the unknowns by owner **before** writing the comment, and send each person only their
own. The first pass on ATPR3I05-516 sent one list to Aleksejus containing hardware
questions; he answered the software ones and replied "visi kiti klausimai ne mano
kompetencija" to the rest, which cost a full round trip that sorting would have avoided.

Check your question is not built on a false premise. "Which of the two Ethernet ports is for
management?" got the answer that no such distinction exists — the question itself was wrong,
not just unanswered. Reading the source first would have caught it.

## The source answers more than people do

For anything the software decides, `ipcc_web` is faster and more precise than asking. Field
definitions, default ports, which features are licence-gated, what a confirmation dialog
says — all of it is in the source, already written down, and it does not cost anyone a
reply. Ask a person only for what the code cannot tell you: physical objects, commercial
policy, and intent.

Watch for Lithuanian comments in that source. `// Tik RL25 + network_settings scope` is how
we learned that the network-settings screen exists only on RL25 — a fact nobody had
mentioned and no English identifier revealed.
