import type { NextPage } from 'next';
import Head from 'next/head';
import { Key, ReactChild, ReactFragment, ReactPortal, SetStateAction, useState } from 'react';
var cards = require('./data/cards.json');
var player = require('./data/player.json');
require('dotenv').config();

const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

const Home: NextPage = () =>
{
  const [id, setId] = useState("")
  const TOKEN = process.env.TOKEN;
  const handleChange = (e: { target: { value: SetStateAction<string> } }) => setId(e.target.value)
  const handleSubmit = async (e: { preventDefault: () => void }) =>
  {
    e.preventDefault()
    if (id.length == 0) {
      alert("Please enter a valid player id")
      return
    }
  }
  const url = `https://api.clashroyale.com/v1/players/%23${id.slice(1)}`
  try {
    const response = await axios.get(url, {
      // allow cross origin requests
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json",
        "Authorization": `Bearer ${TOKEN}`
      }
    })
    console.log(response.data)
  }
  catch (error) {
    console.log(error)
  }
}
const cards = player.cards
console.log(player.currentDeck)
cards.sort((a: { maxLevel: number; level: number; }, b: { maxLevel: number; level: number; }) => (a.maxLevel - a.level) - (b.maxLevel - b.level))
const currentDeck = new Set(player.currentDeck.map((card: { id: any; }) => card.id))
const currentDeckCards = player.currentDeck

const cardLevel = {}
cards.forEach((card: { name: string; maxLevel: number; level: number; }) =>
{
  var name = card.name.replace(' ', '-').toLowerCase();
  if (name == "p.e.k.k.a") {
    name = "pekka"
  }
  if (name == "mini-p.e.k.k.a") {
    name = "mini-pekka"
  }
  cardLevel[name] = 14 - card.maxLevel + card.level
})

const shivamCards = {
  'knight': 'https://api-assets.clashroyale.com/cards/300/jAj1Q5rclXxU9kVImGqSJxa4wEMfEhvwNQ_4jiGUuqg.png', 'archers': 'https://api-assets.clashroyale.com/cards/300/W4Hmp8MTSdXANN8KdblbtHwtsbt0o749BbxNqmJYfA8.png', 'goblins': 'https://api-assets.clashroyale.com/cards/300/X_DQUye_OaS3QN6VC9CPw05Fit7wvSm3XegXIXKP--0.png', 'giant': 'https://api-assets.clashroyale.com/cards/300/Axr4ox5_b7edmLsoHxBX3vmgijAIibuF6RImTbqLlXE.png', 'pekka': 'https://api-assets.clashroyale.com/cards/300/MlArURKhn_zWAZY-Xj1qIRKLVKquarG25BXDjUQajNs.png', 'minions': 'https://api-assets.clashroyale.com/cards/300/yHGpoEnmUWPGV_hBbhn-Kk-Bs838OjGzWzJJlQpQKQA.png', 'balloon': 'https://api-assets.clashroyale.com/cards/300/qBipxLo-3hhCnPrApp2Nn3b2NgrSrvwzWytvREev0CY.png', 'witch': 'https://api-assets.clashroyale.com/cards/300/cfwk1vzehVyHC-uloEIH6NOI0hOdofCutR5PyhIgO6w.png', 'barbarians': 'https://api-assets.clashroyale.com/cards/300/TvJsuu2S4yhyk1jVYUAQwdKOnW4U77KuWWOTPOWnwfI.png', 'golem': 'https://api-assets.clashroyale.com/cards/300/npdmCnET7jmVjJvjJQkFnNSNnDxYHDBigbvIAloFMds.png', 'skeletons': 'https://api-assets.clashroyale.com/cards/300/oO7iKMU5m0cdxhYPZA3nWQiAUh2yoGgdThLWB1rVSec.png', 'valkyrie': 'https://api-assets.clashroyale.com/cards/300/0lIoYf3Y_plFTzo95zZL93JVxpfb3MMgFDDhgSDGU9A.png', 'skeleton-army': 'https://api-assets.clashroyale.com/cards/300/fAOToOi1pRy7svN2xQS6mDkhQw2pj9m_17FauaNqyl4.png', 'bomber': 'https://api-assets.clashroyale.com/cards/300/12n1CesxKIcqVYntjxcF36EFA-ONw7Z-DoL0_rQrbdo.png', 'musketeer': 'https://api-assets.clashroyale.com/cards/300/Tex1C48UTq9FKtAX-3tzG0FJmc9jzncUZG3bb5Vf-Ds.png', 'baby-dragon': 'https://api-assets.clashroyale.com/cards/300/cjC9n4AvEZJ3urkVh-rwBkJ-aRSsydIMqSAV48hAih0.png', 'prince': 'https://api-assets.clashroyale.com/cards/300/3JntJV62aY0G1Qh6LIs-ek-0ayeYFY3VItpG7cb9I60.png', 'wizard': 'https://api-assets.clashroyale.com/cards/300/Mej7vnv4H_3p_8qPs_N6_GKahy6HDr7pU7i9eTHS84U.png', 'mini-pekka': 'https://api-assets.clashroyale.com/cards/300/Fmltc4j3Ve9vO_xhHHPEO3PRP3SmU2oKp2zkZQHRZT4.png', 'spear-goblins': 'https://api-assets.clashroyale.com/cards/300/FSDFotjaXidI4ku_WFpVCTWS1hKGnFh1sxX0lxM43_E.png', 'giant-skeleton': 'https://api-assets.clashroyale.com/cards/300/0p0gd0XaVRu1Hb1iSG1hTYbz2AN6aEiZnhaAib5O8Z8.png', 'hog-rider': 'https://api-assets.clashroyale.com/cards/300/Ubu0oUl8tZkusnkZf8Xv9Vno5IO29Y-jbZ4fhoNJ5oc.png', 'minion-horde': 'https://api-assets.clashroyale.com/cards/300/Wyjq5l0IXHTkX9Rmpap6HaH08MvjbxFp1xBO9a47YSI.png', 'ice-wizard': 'https://api-assets.clashroyale.com/cards/300/W3dkw0HTw9n1jB-zbknY2w3wHuyuLxSRIAV5fUT1SEY.png', 'royal-giant': 'https://api-assets.clashroyale.com/cards/300/mnlRaNtmfpQx2e6mp70sLd0ND-pKPF70Cf87_agEKg4.png', 'guards': 'https://api-assets.clashroyale.com/cards/300/1ArKfLJxYo6_NU_S9cAeIrfbXqWH0oULVJXedxBXQlU.png', 'princess': 'https://api-assets.clashroyale.com/cards/300/bAwMcqp9EKVIKH3ZLm_m0MqZFSG72zG-vKxpx8aKoVs.png', 'dark-prince': 'https://api-assets.clashroyale.com/cards/300/M7fXlrKXHu2IvpSGpk36kXVstslbR08Bbxcy0jQcln8.png', 'three-musketeers': 'https://api-assets.clashroyale.com/cards/300/_J2GhbkX3vswaFk1wG-dopwiHyNc_YiPhwroiKF3Mek.png', 'lava-hound': 'https://api-assets.clashroyale.com/cards/300/unicRQ975sBY2oLtfgZbAI56ZvaWz7azj-vXTLxc0r8.png', 'ice-spirit': 'https://api-assets.clashroyale.com/cards/300/lv1budiafU9XmSdrDkk0NYyqASAFYyZ06CPysXKZXlA.png', 'fire-spirit': 'https://api-assets.clashroyale.com/cards/300/16-BqusVvynIgYI8_Jci3LDC-r8AI_xaIYLgXqtlmS8.png', 'miner': 'https://api-assets.clashroyale.com/cards/300/Y4yWvdwBCg2FpAZgs8T09Gy34WOwpLZW-ttL52Ae8NE.png', 'sparky': 'https://api-assets.clashroyale.com/cards/300/2GKMkBrArZXgQxf2ygFjDs4VvGYPbx8F6Lj_68iVhIM.png', 'bowler': 'https://api-assets.clashroyale.com/cards/300/SU4qFXmbQXWjvASxVI6z9IJuTYolx4A0MKK90sTIE88.png', 'lumberjack': 'https://api-assets.clashroyale.com/cards/300/E6RWrnCuk13xMX5OE1EQtLEKTZQV6B78d00y8PlXt6Q.png', 'battle-ram': 'https://api-assets.clashroyale.com/cards/300/dyc50V2cplKi4H7pq1B3I36pl_sEH5DQrNHboS_dbbM.png', 'inferno-dragon': 'https://api-assets.clashroyale.com/cards/300/y5HDbKtTbWG6En6TGWU0xoVIGs1-iQpIP4HC-VM7u8A.png', 'ice-golem': 'https://api-assets.clashroyale.com/cards/300/r05cmpwV1o7i7FHodtZwW3fmjbXCW34IJCsDEV5cZC4.png', 'mega-minion': 'https://api-assets.clashroyale.com/cards/300/-T_e4YLbuhPBKbYnBwQfXgynNpp5eOIN_0RracYwL9c.png', 'dart-goblin': 'https://api-assets.clashroyale.com/cards/300/BmpK3bqEAviflqHCdxxnfm-_l3pRPJw3qxHkwS55nCY.png', 'goblin-gang': 'https://api-assets.clashroyale.com/cards/300/NHflxzVAQT4oAz7eDfdueqpictb5vrWezn1nuqFhE4w.png', 'electro-wizard': 'https://api-assets.clashroyale.com/cards/300/RsFaHgB3w6vXsTjXdPr3x8l_GbV9TbOUCvIx07prbrQ.png', 'elite-barbarians': 'https://api-assets.clashroyale.com/cards/300/C88C5JH_F3lLZj6K-tLcMo5DPjrFmvzIb1R2M6xCfTE.png', 'hunter': 'https://api-assets.clashroyale.com/cards/300/VNabB1WKnYtYRSG7X_FZfnZjQDHTBs9A96OGMFmecrA.png', 'executioner': 'https://api-assets.clashroyale.com/cards/300/9XL5BP2mqzV8kza6KF8rOxrpCZTyuGLp2l413DTjEoM.png', 'bandit': 'https://api-assets.clashroyale.com/cards/300/QWDdXMKJNpv0go-HYaWQWP6p8uIOHjqn-zX7G0p3DyM.png', 'royal-recruits': 'https://api-assets.clashroyale.com/cards/300/jcNyYGUiXXNz3kuz8NBkHNKNREQKraXlb_Ts7rhCIdM.png', 'night-witch': 'https://api-assets.clashroyale.com/cards/300/NpCrXDEDBBJgNv9QrBAcJmmMFbS7pe3KCY8xJ5VB18A.png', 'bats': 'https://api-assets.clashroyale.com/cards/300/EnIcvO21hxiNpoI-zO6MDjLmzwPbq8Z4JPo2OKoVUjU.png', 'royal-ghost': 'https://api-assets.clashroyale.com/cards/300/3En2cz0ISQAaMTHY3hj3rTveFN2kJYq-H4VxvdJNvCM.png', 'ram-rider': 'https://api-assets.clashroyale.com/cards/300/QaJyerT7f7oMyZ3Fv1glKymtLSvx7YUXisAulxl7zRI.png', 'zappies': 'https://api-assets.clashroyale.com/cards/300/QZfHRpLRmutZbCr5fpLnTpIp89vLI6NrAwzGZ8tHEc4.png', 'rascals': 'https://api-assets.clashroyale.com/cards/300/KV48DfwVHKx9XCjzBdk3daT_Eb52Me4VgjVO7WctRc4.png', 'cannon-cart': 'https://api-assets.clashroyale.com/cards/300/aqwxRz8HXzqlMCO4WMXNA1txynjXTsLinknqsgZLbok.png', 'mega-knight': 'https://api-assets.clashroyale.com/cards/300/O2NycChSNhn_UK9nqBXUhhC_lILkiANzPuJjtjoz0CE.png', 'skeleton-barrel': 'https://api-assets.clashroyale.com/cards/300/vCB4DWCcrGbTkarjcOiVz4aNDx6GWLm0yUepg9E1MGo.png', 'flying-machine': 'https://api-assets.clashroyale.com/cards/300/hzKNE3QwFcrSrDDRuVW3QY_OnrDPijSiIp-PsWgFevE.png', 'wall-breakers': 'https://api-assets.clashroyale.com/cards/300/_xPphEfC8eEwFNrfU3cMQG9-f5JaLQ31ARCA7l3XtW4.png', 'royal-hogs': 'https://api-assets.clashroyale.com/cards/300/ASSQJG_MoVq9e81HZzo4bynMnyLNpNJMfSLb3hqydOw.png', 'goblin-giant': 'https://api-assets.clashroyale.com/cards/300/SoW16cY3jXBwaTDvb39DkqiVsoFVaDWbzf5QBYphJrY.png', 'fisherman': 'https://api-assets.clashroyale.com/cards/300/U2KZ3g0wyufcuA5P2Xrn3Z3lr1WiJmc5S0IWOZHgizQ.png', 'magic-archer': 'https://api-assets.clashroyale.com/cards/300/Avli3W7BxU9HQ2SoLiXnBgGx25FoNXUSFm7OcAk68ek.png', 'electro-dragon': 'https://api-assets.clashroyale.com/cards/300/tN9h6lnMNPCNsx0LMFmvpHgznbDZ1fBRkx-C7UfNmfY.png', 'firecracker': 'https://api-assets.clashroyale.com/cards/300/c1rL3LO1U2D9-TkeFfAC18gP3AO8ztSwrcHMZplwL2Q.png', 'elixir-golem': 'https://api-assets.clashroyale.com/cards/300/puhMsZjCIqy21HW3hYxjrk_xt8NIPyFqjRy-BeLKZwo.png', 'battle-healer': 'https://api-assets.clashroyale.com/cards/300/KdwXcoigS2Kg-cgA7BJJIANbUJG6SNgjetRQ-MegZ08.png', 'skeleton-king': 'https://api-assets.clashroyale.com/cards/300/dCd69_wN9f8DxwuqOGtR4QgWhHIPIaTNxZ1e23RzAAc.png', 'archer-queen': 'https://api-assets.clashroyale.com/cards/300/p7OQmOAFTery7zCzlpDdm-LOD1kINTm42AwIHchZfWk.png', 'golden-knight': 'https://api-assets.clashroyale.com/cards/300/WJd207D0O1sN-l1FTb8P9KhYL2oF5jY26vRUfTUW3FQ.png', 'skeleton-dragons': 'https://api-assets.clashroyale.com/cards/300/qPOtg9uONh47_NLxGhhFc_ww9PlZ6z3Ry507q1NZUXs.png', 'mother-witch': 'https://api-assets.clashroyale.com/cards/300/fO-Xah8XZkYKaSK9SCp3wnzwxtvIhun9NVY-zzte1Ng.png', 'electro-spirit': 'https://api-assets.clashroyale.com/cards/300/WKd4-IAFsgPpMo7dDi9sujmYjRhOMEWiE07OUJpvD9g.png', 'electro-giant': 'https://api-assets.clashroyale.com/cards/300/_uChZkNHAMq6tPb3v6A49xinOe3CnhjstOhG6OZbPYc.png', 'cannon': 'https://api-assets.clashroyale.com/cards/300/nZK1y-beLxO5vnlyUhK6-2zH2NzXJwqykcosqQ1cmZ8.png', 'goblin-hut': 'https://api-assets.clashroyale.com/cards/300/l8ZdzzNLcwB4u7ihGgxNFQOjCT_njFuAhZr7D6PRF7E.png', 'mortar': 'https://api-assets.clashroyale.com/cards/300/lPOSw6H7YOHq2miSCrf7ZDL3ANjhJdPPDYOTujdNrVE.png', 'inferno-tower': 'https://api-assets.clashroyale.com/cards/300/GSHY_wrooMMLET6bG_WJB8redtwx66c4i80ipi4gYOM.png', 'bomb-tower': 'https://api-assets.clashroyale.com/cards/300/rirYRyHPc97emRjoH-c1O8uZCBzPVnToaGuNGusF3TQ.png', 'barbarian-hut': 'https://api-assets.clashroyale.com/cards/300/ho0nOG2y3Ch86elHHcocQs8Fv_QNe0cFJ2CijsxABZA.png', 'tesla': 'https://api-assets.clashroyale.com/cards/300/OiwnGrxFMNiHetYEerE-UZt0L_uYNzFY7qV_CA_OxR4.png', 'elixir-collector': 'https://api-assets.clashroyale.com/cards/300/BGLo3Grsp81c72EpxLLk-Sofk3VY56zahnUNOv3JcT0.png', 'x-bow': 'https://api-assets.clashroyale.com/cards/300/zVQ9Hme1hlj9Dc6e1ORl9xWwglcSrP7ejow5mAhLUJc.png', 'tombstone': 'https://api-assets.clashroyale.com/cards/300/LjSfSbwQfkZuRJY4pVxKspZ-a0iM5KAhU8w-a_N5Z7Y.png', 'furnace': 'https://api-assets.clashroyale.com/cards/300/iqbDiG7yYRIzvCPXdt9zPb3IvMt7F7Gi4wIPnh2x4aI.png', 'goblin-cage': 'https://api-assets.clashroyale.com/cards/300/vD24bBgK4rSq7wx5QEbuqChtPMRFviL_ep76GwQw1yA.png', 'goblin-drill': 'https://api-assets.clashroyale.com/cards/300/eN2TKUYbih-26yBi0xy5LVFOA0zDftgDqxxnVfdIg1o.png', 'fireball': 'https://api-assets.clashroyale.com/cards/300/lZD9MILQv7O-P3XBr_xOLS5idwuz3_7Ws9G60U36yhc.png', 'arrows': 'https://api-assets.clashroyale.com/cards/300/Flsoci-Y6y8ZFVi5uRFTmgkPnCmMyMVrU7YmmuPvSBo.png', 'rage': 'https://api-assets.clashroyale.com/cards/300/bGP21OOmcpHMJ5ZA79bHVV2D-NzPtDkvBskCNJb7pg0.png', 'rocket': 'https://api-assets.clashroyale.com/cards/300/Ie07nQNK9CjhKOa4-arFAewi4EroqaA-86Xo7r5tx94.png', 'goblin-barrel': 'https://api-assets.clashroyale.com/cards/300/CoZdp5PpsTH858l212lAMeJxVJ0zxv9V-f5xC8Bvj5g.png', 'freeze': 'https://api-assets.clashroyale.com/cards/300/I1M20_Zs_p_BS1NaNIVQjuMJkYI_1-ePtwYZahn0JXQ.png', 'mirror': 'https://api-assets.clashroyale.com/cards/300/wC6Cm9rKLEOk72zTsukVwxewKIoO4ZcMJun54zCPWvA.png', 'lightning': 'https://api-assets.clashroyale.com/cards/300/fpnESbYqe5GyZmaVVYe-SEu7tE0Kxh_HZyVigzvLjks.png', 'zap': 'https://api-assets.clashroyale.com/cards/300/7dxh2-yCBy1x44GrBaL29vjqnEEeJXHEAlsi5g6D1eY.png', 'poison': 'https://api-assets.clashroyale.com/cards/300/98HDkG2189yOULcVG9jz2QbJKtfuhH21DIrIjkOjxI8.png', 'graveyard': 'https://api-assets.clashroyale.com/cards/300/Icp8BIyyfBTj1ncCJS7mb82SY7TPV-MAE-J2L2R48DI.png', 'the-log': 'https://api-assets.clashroyale.com/cards/300/_iDwuDLexHPFZ_x4_a0eP-rxCS6vwWgTs6DLauwwoaY.png',
  'tornado': 'https://api-assets.clashroyale.com/cards/300/QJB-QK1QJHdw4hjpAwVSyZBozc2ZWAR9pQ-SMUyKaT0.png', 'clone': 'https://api-assets.clashroyale.com/cards/300/mHVCet-1TkwWq-pxVIU2ZWY9_2z7Z7wtP25ArEUsP_g.png', 'earthquake': 'https://api-assets.clashroyale.com/cards/300/XeQXcrUu59C52DslyZVwCnbi4yamID-WxfVZLShgZmE.png', 'barbarian-barrel': 'https://api-assets.clashroyale.com/cards/300/Gb0G1yNy0i5cIGUHin8uoFWxqntNtRPhY_jeMXg7HnA.png', 'heal-spirit': 'https://api-assets.clashroyale.com/cards/300/GITl06sa2nGRLPvboyXbGEv5E3I-wAwn1Eqa5esggbc.png', 'giant-snowball': 'https://api-assets.clashroyale.com/cards/300/7MaJLa6hK9WN2_VIshuh5DIDfGwm0wEv98gXtAxLDPs.png', 'royal-delivery': 'https://api-assets.clashroyale.com/cards/300/LPg7AGjGI3_xmi7gLLgGC50yKM1jJ2teWkZfoHJcIZo.png'
}


const shivamdeck = {
  'dart-goblin,goblin-barrel,inferno-tower,knight,princess,skeleton-army,skeleton-barrel,the-log': 95,
  'dart-goblin,goblin-barrel,inferno-tower,princess,skeleton-army,skeleton-barrel,the-log,valkyrie': 94,
  'arrows,battle-healer,electro-dragon,elite-barbarians,elixir-golem,inferno-dragon,rage,zap': 92,
  'dark-prince,electro-wizard,goblin-giant,mega-minion,mini-pekka,rage,sparky,zap': 91
}


return (
  <div className="flex min-h-screen flex-col items-center justify-center py-2">
    <Head>
      <title>CR Deck Builder</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className="flex justify-center">
      <div className="w-full max-w-sm p-4 bg-gray-200 rounded">
        <h2 className="text-center text-teal-500 text-xl font-bold mb-4">
          Clash Royale Deck Builder
        </h2>
        <div className="flex flex-col items-center justify-center pb-4">
          <input type="text" placeholder='Player ID' className="w-full p-2 border border-gray-400 rounded"
            value={id} onChange={handleChange} />
        </div>
        <button
          className="w-full p-2 bg-teal-500 text-white font-bold rounded"
          type='submit'
        >
          Get Suggested Decks
        </button>
      </div>
    </div>
    <div className='container mx-auto px-8 my-12'>
      <div className="flex flex-col items-center justify-center pb-4">
        <p className=" text-teal-500 text-xl font-bold mb-4 ">
          {player.name}
        </p>
        <div className='flex flex-row items-center justify-center pb-4'>
          <div className="w-full px-4 mx-2 bg-gray-100 h-80 hover:bg-white hover:shadow-xl  rounded-lg">
            <h2 className="font-bold font-gray-500 text-center">Info</h2>
            <div>
              <p className='py-1'>
                {player.tag}
              </p>
              <p className='py-1'>
                {player.role}
              </p>
              <p className='py-1'>
                {player.arena.name}
              </p>
              <p className='py-1'>
                {player.clan.name} ({player.clan.tag})
              </p>
              <p className='py-1'>
                {player.starPoints} Starpoints
              </p>
              <p className='py-1'>
                {player.expPoints} XP Points
              </p>
              <p className='py-1'>
                {player.expLevel} XP Level
              </p>
              <p className='py-1'>
                Favourite: {player.currentFavouriteCard.name}
              </p>
            </div>
          </div>
          <div className='w-full px-4 mx-2 bg-gray-100 h-80 hover:bg-white hover:shadow-xl rounded-lg'>
            <h2 className="font-bold font-gray-500 text-center">Stats</h2>
            <p className="py-0.5">
              <span className='font-semibold'>{player.trophies}</span> trophies
            </p>
            <p className="py-0.5">
              <span className='font-semibold'>{player.wins}</span> wins
            </p>
            <p className="py-0.5">
              <span className='font-semibold'>{player.losses}</span> losses
            </p>
            <p className="py-0.5">
              <span className='font-semibold'>{player.battleCount}</span> battles
            </p>
            <p className="py-0.5">
              <span className='font-semibold'>{player.threeCrownWins}</span> three crown wins
            </p>
            <p className="py-0.5">
              <span className='font-semibold'>{player.warDayWins}</span> war day wins
            </p>
            <p className="py-0.5">
              <span className='font-semibold'>{player.challengeCardsWon}</span> (challenges)
            </p>
            <p className="py-0.5">
              <span className='font-semibold'>{player.tournamentCardsWon}</span> (tournaments)
            </p>
            <p className="py-0.5">
              <span className='font-semibold'>{player.tournamentBattleCount}</span> tournament battles
            </p>
          </div>
          <div className='w-full px-4 mx-2 bg-gray-100 h-80 hover:bg-white hover:shadow-xl  rounded-lg'>
            <h2 className="font-bold font-gray-500 text-center">Donations & Trophies</h2>
            <p className="py-0.5">
              Current Season: {player.leagueStatistics.currentSeason.trophies}
            </p>
            <p className="py-0.5">
              Best Season: {player.leagueStatistics.bestSeason.trophies}
            </p>
            <p className="py-0.5">
              Previous Season: {player.leagueStatistics.previousSeason.trophies}
            </p>
            <p className="py-0.5">
              Donation: {player.donations}
            </p>
            <p className="py-0.5">
              Donation Received: {player.donationsReceived}
            </p>
            <p className="py-0.5">
              Total Donations: {player.totalDonations}
            </p>
            <p className="py-0.5">
              Clan Cards Collected: {player.clanCardsCollected}
            </p>
          </div>
          <div className='w-full px-4 mx-2 bg-gray-100 h-80 hover:bg-white hover:shadow-xl rounded-lg'>
            <h2 className="font-bold font-gray-500 text-center">Badges</h2>
            {player.badges.map((badge: { name: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; progress: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; }) => (
              <p className='text-center my-1'>
                {badge.name}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-center">
          {player.achievements.map((achievement: { info: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; name: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; stars: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; target: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; value: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; }, index: Key | null | undefined) => (
            <div key={index} className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 p-2">
              <div className="bg-purple-200 rounded overflow-hidden shadow-lg p-4 h-44">

                <p className="text-center text-gray-500 text-sm  mb-1">
                  <span className="font-semibold text-black"> {achievement.info}</span>
                </p>
                <p className="text-center text-gray-500 text-sm  mb-1">
                  <span className="font-semibold"> {achievement.name}</span>
                </p>
                <p className="text-center text-gray-500 text-sm  mb-1">
                  Stars: <span className="font-semibold"> {achievement.stars}</span>
                </p>
                <p className="text-center text-gray-500 text-sm mb-1">
                  Target: <span className="font-semibold"> {achievement.target}</span>
                </p>
                <h4 className="text-center text-gray-500 text-sm mb-1">
                  Value: <span className="font-semibold"> {achievement.value}</span>
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-col items-center justify-center pb-4'>
        <h2 className="font-bold font-gray-500">{player.name}'s Current Cards</h2>
        <div className="flex flex-wrap max-w-2xl">
          {currentDeckCards.map((card: { iconUrls: { medium: string | undefined; }; name: {} | null | undefined; maxLevel: number; level: number; }, index: Key | null | undefined) => (
            <div className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/4 p-2" key={index}>
              <div className="bg-gray-200 rounded overflow-hidden shadow-lg">
                <img className="w-full" src={card.iconUrls.medium} alt={card.name} />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{card.name}</div>
                  <p className="text-base ">
                    Level: <span className='font-bold'>{14 - card.maxLevel + card.level}/14</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h1 className='text-center font-bold font-xl justify-center'>Suggested Decks</h1>
      {Object.keys(shivamdeck).map((key: string) => (
        <div className='flex flex-col mx-auto px-6 bg-orange-400 rounded-lg my-6 max-w-2xl' key={key}>
          <h3 className="font-gray-500 text-center">{key} : {shivamdeck[key]}</h3>
          <div className="flex flex-wrap">
            {key.split(",").map((card, index) => (
              <div className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/4 p-2" key={index}>
                <div className="bg-gray-200 h-72 rounded overflow-hidden shadow-lg">
                  <img className="w-full" src={shivamCards[card]} alt={card} />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{capitalizeFirstLetter(card.replace("-", " "))}</div>
                    <p className="text-base ">
                      Level: <span className='font-bold'>{cardLevel[card]}/14</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div>
        <h2 className="text-center text-black-900 text-lg font-bold mb-1">
          {player.name}'s All Cards
        </h2>
        <div className="flex flex-wrap justify-center">
          {cards.map((card: { id: unknown; iconUrls: { medium: string | undefined; }; name: {} | null | undefined; maxLevel: number; level: number; }, index: Key | null | undefined) => (
            !currentDeck.has(card.id) &&
            <div className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 p-2" key={index}>
              <div className="bg-gray-200 rounded overflow-hidden shadow-lg">
                <img className="w-full" src={card.iconUrls.medium} />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{card.name}</div>
                  <p className="text-base ">
                    Level: <span className='font-bold'>{14 - card.maxLevel + card.level}/14</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div >
  </div>
)
}

export default Home

