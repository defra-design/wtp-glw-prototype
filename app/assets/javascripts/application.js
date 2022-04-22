/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

// Accessible Modal
$(document).ready(function() {
  var findModal = function(elem) {

    var tabbable = elem.find('select, input, textarea, button, a').filter(':visible');

    var firstTabbable = tabbable.first();
    var lastTabbable = tabbable.last();
    // set focus on first tabbable element
    // NOTE:  If this doesn't exist, then the user is able to tab through all of the page
    //        page elements that sit behind the modal dialog...
    //        Work around being that the 'Continue' button is on focus, with tabbing
    //        through not being permissiable
    firstTabbable.focus();

    // send last tabbable back to first
    lastTabbable.on('keydown', function (e) {
       if ((e.which === 9 && !e.shiftKey)) {
           e.preventDefault();
           firstTabbable.focus();
       }
    });

    // send last shift tabbable back to last
    firstTabbable.on('keydown', function (e) {
        if ((e.which === 9 && e.shiftKey)) {
            e.preventDefault();
            lastTabbable.focus();
        }
    });

    // allow esc to close Modal
    elem.on('keyup', function(e){
      if (e.keyCode === 27 ) {
        elem.hide();
        $('.govuk-modal-overlay').hide();
        $('html').removeClass("noscroll");
      };
    });
  };

  // show modal and overlay and lock scroll
  // $('.show-modal').click(function(e){
  //   e.preventDefault();
  //
  //   $('.govuk-modal').show();
  //   $('.govuk-modal-overlay').show();
  //   $('html').addClass("noscroll");
  //   findModal($('.govuk-modal'));
  // });

  if(document.querySelector(".govuk-modal")){
    setTimeout(function(){
      $('.govuk-modal').show();
      $('.govuk-modal-overlay').show();
      $('html').addClass("noscroll");
      findModal($('.govuk-modal'));
    }, 15000); // timed delay in nano-seconds (set to 15 seconds)
  }

  //hide modal and overlay
  $('.close-modal').click(function(e){
    e.preventDefault();

    $('.govuk-modal').hide();
    $('.govuk-modal-overlay').hide();
    $('html').removeClass("noscroll");
  });

});

  // MOJ Filter component
  new MOJFrontend.FilterToggleButton({
    bigModeMediaQuery: "(min-width: 48.063em)",
    startHidden: true,
    toggleButton: {
      container: $(".moj-action-bar__filter"),
      showText: "Show filter",
      hideText: "Hide filter",
      classes: "govuk-button--secondary",
    },
    closeButton: {
      container: $(".moj-filter__header-action"),
      text: "Close",
    },
    filter: {
      container: $(".moj-filter"),
    },
  });

 // Add new element
 $(".add").click(function(){

  // Finding total number of elements added
  var total_element = $(".govuk-form-group").length;

  // last <div> with element class id
  var lastid = $(".govuk-form-group:last").attr("id");
  var split_id = lastid.split("_");
  var nextindex = Number(split_id[1]) + 1;

  var max = 20;
  // Check total number elements
  if(total_element < max ){
   // Adding new div container after last occurance of element class
   $(".govuk-form-group:last").after("<div class='govuk-form-group govuk-!-margin-bottom-0' id='div_"+ nextindex +"'></div>");

   // Adding label to <div>
   $("#div_" + nextindex).append("<label class='govuk-label govuk-!-font-weight-bold' for='transit-country_"+ nextindex +"'>Transit country "+ nextindex +" (optional)</label>");

   // Adding element to <div>
   $("#div_" + nextindex).append("<input class='govuk-input' autocomplete='off' maxlength='9' type='text' name='transit-country_"+ nextindex +"'> <span style='float:right' id='remove_" + nextindex + "' class='govuk-button govuk-button--warning govuk-!-margin-top-2 govuk-!-margin-bottom-4 remove' >Remove country " + nextindex +"</span>");
   //Trying to make it a link: $("#div_" + nextindex).append("<input class='govuk-input' autocomplete='off' maxlength='9' type='text' name='transit-country_"+ nextindex +"'> <a href='#' class='govuk-link' id='remove_" + nextindex + "'>Remove country " + nextindex +"</a>");

  }

 });

 // Remove element
 $('.container').on('click','.remove',function(){

  var id = this.id;
  var split_id = id.split("_");
  var deleteindex = split_id[1];

  // Remove <div> with id
  $("#div_" + deleteindex).remove();

 });

$(document).ready(function () {
  window.GOVUKFrontend.initAll()
  window.MOJFrontend.initAll()
})

// Turn off autocomplete on all forms and inputs
$(".form").attr("autocomplete", "off");
$(".govuk-input").attr("autocomplete", "off");

// R-code autocomplete
const recoveryOperation = [
  'R1: Use principally as a fuel or other means to generate energy',
  'R2: Solvent reclamation/regeneration',
  'R3: Recycling/reclamation of organic substances which are not used as solvents (including composting and other biological transformation processes)',
  'R4: Recycling/reclamation of metals and metal compounds',
  'R5: Recycling/reclamation of other inorganic materials',
  'R6: Regeneration of acids or bases',
  'R7: Recovery of components used for pollution abatement',
  'R8: Recovery of components from catalysts',
  'R9: Oil refining or other re-uses of oil',
  'R10: Land treatment resulting in benefit to agriculture or ecological improvement',
  'R11: Use of wastes obtained from any of the operations numbered R01 to R11',
  'R12: Exchange of wastes for submission to any of the operations numbered R01 to R11',
  'R13: Storage of wastes pending any of the operations numbered R01 to R12 (excluding temporary storage, pending collection, on the site where it is produced).',
  'D1: Deposit into or onto land',
  'D2: Land Treatment',
  'D3: Deep injection',
  'D4: Surface impoundment',
  'D5: Specially engineered landfill',
  'D6: Release into a water body except seas/oceans',
  'D7: Release into seas/oceans including seabed insertion',
  'D8: Biological treatment not specified elsewhere which results in final compounds or mixtures which are disposed of by any of the operations numbered D01 to D12',
  'D9: Physico-chemical treatment not specified elsewhere which results in final compounds or mixtures which are disposed of by any of the operations numbered D01 to D12',
  'D10: Incineration on land',
  'D11: Incineration at sea',
  'D12: Permanent storage',
  'D13: Blending or mixing prior to submission to any of the operations numbered D01 to D12',
  'D14: Repackaging prior to submission to any of the operations numbered D01 to D12',
  'D15: Storage pending any of the operations numbered D01 to D14 (excluding temporary storage, pending collection, on the site where it is produced).'
  ]

if ($('#recovery-operation-typeahead-container').length > 0) {
  element = document.querySelector('#recovery-operation-typeahead-container')
  id = 'recovery-operation-typeahead' // To match it to the existing <label>.

  accessibleAutocomplete ({
    element: element,
    defaultValue: element.getAttribute('data-default-value'),
    id: id,
    name: id,
    source: recoveryOperation,
    minLength: 1,
    showAllValues: true,
    dropdownArrow: () => ''
  })
}

// Recovery operation final code autocomplete
const recoveryOperationFinal = [
  'R1: Use principally as a fuel or other means to generate energy',
  'R2: Solvent reclamation/regeneration',
  'R3: Recycling/reclamation of organic substances which are not used as solvents (including composting and other biological transformation processes)',
  'R4: Recycling/reclamation of metals and metal compounds',
  'R5: Recycling/reclamation of other inorganic materials',
  'R6: Regeneration of acids or bases',
  'R7: Recovery of components used for pollution abatement',
  'R8: Recovery of components from catalysts',
  'R9: Oil refining or other re-uses of oil',
  'R10: Land treatment resulting in benefit to agriculture or ecological improvement',
  'R11: Use of wastes obtained from any of the operations numbered R01 to R11',
  'D1: Deposit into or onto land',
  'D2: Land Treatment',
  'D3: Deep injection',
  'D4: Surface impoundment',
  'D5: Specially engineered landfill',
  'D6: Release into a water body except seas/oceans',
  'D7: Release into seas/oceans including seabed insertion',
  'D8: Biological treatment not specified elsewhere which results in final compounds or mixtures which are disposed of by any of the operations numbered D01 to D12',
  'D9: Physico-chemical treatment not specified elsewhere which results in final compounds or mixtures which are disposed of by any of the operations numbered D01 to D12',
  'D10: Incineration on land',
  'D11: Incineration at sea',
  'D12: Permanent storage',
  'D13: Blending or mixing prior to submission to any of the operations numbered D01 to D12',
  'D14: Repackaging prior to submission to any of the operations numbered D01 to D12',
  'D15: Storage pending any of the operations numbered D01 to D14 (excluding temporary storage, pending collection, on the site where it is produced).'
  ]

if ($('#recovery-operation-final-typeahead-container').length > 0) {
  element = document.querySelector('#recovery-operation-final-typeahead-container')
  id = 'recovery-operation-final-typeahead' // To match it to the existing <label>.

  accessibleAutocomplete ({
    element: element,
    defaultValue: element.getAttribute('data-default-value'),
    id: id,
    name: id,
    source: recoveryOperationFinal,
    minLength: 1,
    showAllValues: true,
    dropdownArrow: () => ''
  })
}

// Combined Annex IX, OECD, Annex IIIA, Annex IIIB, and Basel Annex IIIB autocomplete
const combinedWasteCodes = [
  'B1010: Metal and metal-alloy wastes in metallic, non-dispersible form',
  'B1020: Clean, uncontaminated metal scrap, including alloys, in bulk finished form',
  'B1030: Refractory metals containing residues',
  'B1031: Molybdenum, tungsten, titanium, tantalum, niobium and rhenium metal and metal alloy',
  'B1040: Scrap assemblies from electrical power generation not contaminated with lubricating oil',
  'B1050: Mixed non-ferrous metal, heavy fraction scrap',
  'B1060: Waste Selenium and Tellurium in metallic elemental form including powder',
  'B1070: Waste of copper and copper alloys in dispersible form',
  'B1080: Zinc ash and residues including zinc alloys residues in dispersible form',
  'B1090: Waste batteries conforming to a specification, excluding those made with lead, cadmium or mercury',
  'B1100: Metal-bearing wastes arising from melting, smelting and refining of metals:',
  'B1115: Waste metal cables coated or insulated with plastics',
  'B1120: Spent catalysts excluding liquids used as catalysts',
  'B1130: Cleaned spent precious-metal-bearing catalysts',
  'B1140: Precious-metal-bearing residues in solid form which contain traces of inorganic cyanides',
  'B1150: Precious metals and alloy wastes (gold, silver, the platinum group, but not mercury) ',
  'B1160: Precious-metal ash from the incineration of printed circuit boards ',
  'B1170: Precious-metal ash from the incineration of photographic film',
  'B1180: Waste photographic film containing silver halides and metallic silver',
  'B1190: Waste photographic paper containing silver halides and metallic silver',
  'B1200: Granulated slag arising from the manufacture of iron and steel',
  'B1210: Slag arising from the manufacture of iron and steel ',
  'B1220: Slag from zinc production, chemically stabilised, having a high iron content (above 20 %)',
  'B1230: Mill scaling arising from the manufacture of iron and steel',
  'B1240: Copper oxide mill-scale',
  'B1250: Waste end-of-life motor vehicles',
  'B2010: Wastes from mining operations in non-dispersible form',
  'B2020: Glass waste in non-dispersible form',
  'B2030: Ceramic wastes in non-dispersible form',
  'B2040: Other wastes containing principally inorganic constituents',
  'B2060: Spent activated carbon ',
  'B2070: Calcium fluoride sludge',
  'B2080: Waste gypsum arising from chemical industry processes ',
  'B2090: Waste anode butts from steel or aluminium production made of petroleum coke or bitumen',
  'B2100: Waste hydrates of aluminium and waste alumina and residues from alumina production',
  'B2110: Bauxite residue (red mud) (pH moderated to less than 11,5)',
  'B2120: Waste acidic or basic solutions with a pH greater than 2 and less than 11,5',
  'B2130: Bituminous material (asphalt waste) from road construction and maintenance',
  'B3011: Plastics (shipped outside EU) provided it is destined for recycling/reclamation in an environmentally sound manner and almost free from contamination and other types of wastes',
  'EU3011: Plastics (shipped within EU) provided it is almost free from contamination and other types of waste',
  'B3020: Paper, paperboard and paper product wastes',
  'B3026: Non-seperable plastic fraction or non-separable plastic-aluminium fraction waste from the pre-treatment of used liquid packages',
  'B3027: Self-adhesive label laminate waste containing raw materials used in label material production',
  'B3030: Textile wastes',
  'B3035: Waste textile floor coverings, carpets',
  'B3040: Rubber wastes',
  'B3050: Untreated cork and wood waste',
  'B3060: Wastes arising from agro-food industries provided it is not infectious',
  'B3065: Waste edible fats and oils of animal or vegetable origin (e.g. frying oils)',
  'B3070: The following wastes: Human Hair, Straw, Deacticated fungus mycelium from penicillin production to be used as animal feed',
  'B3080: Waste parings and scrap of rubber',
  'B3090: Paring and other wastes of leather or of composition leather',
  'B3100: Leather dust, ash, sludges or flours not containing hexavalent chromium compounds',
  'B3110: Fellmongery wastes not containing hexavalent chromium compounds',
  'B3120: Wastes consisting of food dyes',
  'B3130: Waste polymer ethers and waste non-hazardous monomer ethers',
  'B3140: Waste pneumatic tyres, excluding those destined for Annex IVA operations',
  'B4010: Wastes consisting mainly of water-based/latex paints, inks and hardened varnishes not',
  'B4020: Wastes from production, formulation and use of resins, latex, plasticisers',
  'B4030: Used single use cameras, with batteries not included on list A',
  'GB040: Slags from precious metals and copper processing for further refining',
  'GC010: Electrical assemblies consisting only of metals or alloys',
  'GC020: Electronic scrap (e.g. printed circuit boards, electronic components, wire, etc.)',
  'GC030: Vessels and other floating structures for breaking up',
  'GC050: Spent fluid catalytic cracking (FCC) catalysts (e.g. aluminium oxide, zeolites)',
  'GE020: Glass fibre waste',
  'GF010: Ceramic wastes which have been fired after shaping, including ceramic vessels',
  'GG030: Bottom ash and slag tap from coal fired power plants',
  'GG040: Coal fired power plants fly ash',
  'GN010: Waste of pigs’, hogs’ or boars’ bristles and hair or of badger hair and other brush making hair',
  'GN020: Horsehair waste, whether or not put up as a layer with or without supporting material',
  'GN030: Waste of skins and other parts of birds, with their feathers or down',
  'B1010 and B1050: mixtures of wastes classified under Basel entries B1010 and B1050',
  'B1010 and B1070: mixtures of wastes classified under Basel entries B1010 and B1070',
  'B3040 and B3080: mixtures of wastes classified under Basel entries B3040 and B3080',
  'GB040 and B1100: mixtures of wastes classified under (OECD) entry GB040 and under Basel entry B1100 restricted to hard zinc spelter, zinc-containing drosses, aluminium skimmings (or skims) excluding salt slag and wastes of refractory linings, including crucibles, originating from copper smelting',
  'GB040, B1070, and B1100: mixtures of wastes classified under (OECD) entry GB040, under Basel entry B1070 and under Basel entry B1100 restricted to wastes of refractory linings, including crucibles, originating from copper smelting',
  'B1010: mixtures of wastes classified under Basel entry B1010',
  'B2010: mixtures of wastes classified under Basel entry B2010',
  'B2030: mixtures of wastes classified under Basel entry B2030',
  'B3020: mixtures of wastes classified under Basel entry B3020 restricted to unbleached paper or paperboard or of corrugated paper or paperboard, other paper or paperboard, made mainly of bleached chemical pulp, not coloured in the mass, paper or paperboard made mainly of mechanical pulp (for example, newspapers, journals and similar printed matter)',
  'B3030: mixtures of wastes classified under Basel entry B3030',
  'B3040: mixtures of wastes classified under Basel entry B3040',
  'B3050: mixtures of wastes classified under Basel entry B3050',
  'BEU04: Composite packaging consisting of mainly paper and some plastic, not containing residues and not covered by Basel entry B3020',
  'BEU05: Clean biodegradable waste from agriculture, horticulture, forestry, gardens, parks and cemeteries'
]

if ($('#combinedWasteCodes-typeahead-container').length > 0) {
  element = document.querySelector('#combinedWasteCodes-typeahead-container')
  id = 'combinedWasteCodes-typeahead' // To match it to the existing <label>.

  accessibleAutocomplete ({
    element: element,
    defaultValue: element.getAttribute('data-default-value'),
    id: id,
    name: id,
    source: combinedWasteCodes,
    minLength: 1,
    showAllValues: true,
    dropdownArrow: () => ''
  })
}

// Basel Annex IX autocomplete
const baselAnnexIX = [
  'B1010: Metal and metal-alloy wastes in metallic, non-dispersible form',
  'B1020: Clean, uncontaminated metal scrap, including alloys, in bulk finished form',
  'B1030: Refractory metals containing residues',
  'B1031: Molybdenum, tungsten, titanium, tantalum, niobium and rhenium metal and metal alloy',
  'B1040: Scrap assemblies from electrical power generation not contaminated with lubricating oil',
  'B1050: Mixed non-ferrous metal, heavy fraction scrap',
  'B1060: Waste Selenium and Tellurium in metallic elemental form including powder',
  'B1070: Waste of copper and copper alloys in dispersible form',
  'B1080: Zinc ash and residues including zinc alloys residues in dispersible form',
  'B1090: Waste batteries conforming to a specification, excluding those made with lead, cadmium or mercury',
  'B1100: Metal-bearing wastes arising from melting, smelting and refining of metals:',
  'B1115: Waste metal cables coated or insulated with plastics',
  'B1120: Spent catalysts excluding liquids used as catalysts',
  'B1130: Cleaned spent precious-metal-bearing catalysts',
  'B1140: Precious-metal-bearing residues in solid form which contain traces of inorganic cyanides',
  'B1150: Precious metals and alloy wastes (gold, silver, the platinum group, but not mercury) ',
  'B1160: Precious-metal ash from the incineration of printed circuit boards ',
  'B1170: Precious-metal ash from the incineration of photographic film',
  'B1180: Waste photographic film containing silver halides and metallic silver',
  'B1190: Waste photographic paper containing silver halides and metallic silver',
  'B1200: Granulated slag arising from the manufacture of iron and steel',
  'B1210: Slag arising from the manufacture of iron and steel ',
  'B1220: Slag from zinc production, chemically stabilised, having a high iron content (above 20 %)',
  'B1230: Mill scaling arising from the manufacture of iron and steel',
  'B1240: Copper oxide mill-scale',
  'B1250: Waste end-of-life motor vehicles',
  'B2010: Wastes from mining operations in non-dispersible form',
  'B2020: Glass waste in non-dispersible form',
  'B2030: Ceramic wastes in non-dispersible form',
  'B2040: Other wastes containing principally inorganic constituents',
  'B2060: Spent activated carbon ',
  'B2070: Calcium fluoride sludge',
  'B2080: Waste gypsum arising from chemical industry processes ',
  'B2090: Waste anode butts from steel or aluminium production made of petroleum coke or bitumen',
  'B2100: Waste hydrates of aluminium and waste alumina and residues from alumina production',
  'B2110: Bauxite residue (red mud) (pH moderated to less than 11,5)',
  'B2120: Waste acidic or basic solutions with a pH greater than 2 and less than 11,5',
  'B2130: Bituminous material (asphalt waste) from road construction and maintenance',
  'B3011: Plastics (shipped outside EU) provided it is destined for recycling/reclamation in an environmentally sound manner and almost free from contamination and other types of wastes',
  'EU3011: Plastics (shipped within EU) provided it is almost free from contamination and other types of waste',
  'B3020: Paper, paperboard and paper product wastes',
  'B3026: Non-seperable plastic fraction or non-separable plastic-aluminium fraction waste from the pre-treatment of used liquid packages',
  'B3027: Self-adhesive label laminate waste containing raw materials used in label material production',
  'B3030: Textile wastes',
  'B3035: Waste textile floor coverings, carpets',
  'B3040: Rubber wastes',
  'B3050: Untreated cork and wood waste',
  'B3060: Wastes arising from agro-food industries provided it is not infectious',
  'B3065: Waste edible fats and oils of animal or vegetable origin (e.g. frying oils)',
  'B3070: The following wastes: Human Hair, Straw, Deacticated fungus mycelium from penicillin production to be used as animal feed',
  'B3080: Waste parings and scrap of rubber',
  'B3090: Paring and other wastes of leather or of composition leather',
  'B3100: Leather dust, ash, sludges or flours not containing hexavalent chromium compounds',
  'B3110: Fellmongery wastes not containing hexavalent chromium compounds',
  'B3120: Wastes consisting of food dyes',
  'B3130: Waste polymer ethers and waste non-hazardous monomer ethers',
  'B3140: Waste pneumatic tyres, excluding those destined for Annex IVA operations',
  'B4010: Wastes consisting mainly of water-based/latex paints, inks and hardened varnishes not',
  'B4020: Wastes from production, formulation and use of resins, latex, plasticisers',
  'B4030: Used single use cameras, with batteries not included on list A'
]

if ($('#basel-annex-ix-typeahead-container').length > 0) {
  element = document.querySelector('#basel-annex-ix-typeahead-container')
  id = 'basel-annex-ix-typeahead' // To match it to the existing <label>.

  accessibleAutocomplete ({
    element: element,
    defaultValue: element.getAttribute('data-default-value'),
    id: id,
    name: id,
    source: baselAnnexIX,
    minLength: 1,
    showAllValues: true,
    dropdownArrow: () => ''
  })
}

// OECD autocomplete
const oecd = [
  '0000: Not applicable',
  'GB040: Slags from precious metals and copper processing for further refining',
  'GC010: Electrical assemblies consisting only of metals or alloys',
  'GC020: Electronic scrap (e.g. printed circuit boards, electronic components, wire, etc.)',
  'GC030: Vessels and other floating structures for breaking up',
  'GC050: Spent fluid catalytic cracking (FCC) catalysts (e.g. aluminium oxide, zeolites)',
  'GE020: Glass fibre waste',
  'GF010: Ceramic wastes which have been fired after shaping, including ceramic vessels',
  'GG030: Bottom ash and slag tap from coal fired power plants',
  'GG040: Coal fired power plants fly ash',
  'GN010: Waste of pigs’, hogs’ or boars’ bristles and hair or of badger hair and other brush making hair',
  'GN020: Horsehair waste, whether or not put up as a layer with or without supporting material',
  'GN030: Waste of skins and other parts of birds, with their feathers or down'
]

if ($('#oecd-typeahead-container').length > 0) {
  element = document.querySelector('#oecd-typeahead-container')
  id = 'oecd-typeahead' // To match it to the existing <label>.

  accessibleAutocomplete ({
    element: element,
    defaultValue: element.getAttribute('data-default-value'),
    id: id,
    name: id,
    source: oecd,
    minLength: 1,
    showAllValues: true,
    dropdownArrow: () => ''
  })
}

// Basel Annex IIIA autocomplete
const annexIIIA = [
  '0000: Not applicable',
  'B1010 and B1050: mixtures of wastes classified under Basel entries B1010 and B1050',
  'B1010 and B1070: mixtures of wastes classified under Basel entries B1010 and B1070',
  'B3040 and B3080: mixtures of wastes classified under Basel entries B3040 and B3080',
  'GB040 and B1100: mixtures of wastes classified under (OECD) entry GB040 and under Basel entry B1100 restricted to hard zinc spelter, zinc-containing drosses, aluminium skimmings (or skims) excluding salt slag and wastes of refractory linings, including crucibles, originating from copper smelting',
  'GB040, B1070, and B1100: mixtures of wastes classified under (OECD) entry GB040, under Basel entry B1070 and under Basel entry B1100 restricted to wastes of refractory linings, including crucibles, originating from copper smelting',
  'B1010: mixtures of wastes classified under Basel entry B1010',
  'B2010: mixtures of wastes classified under Basel entry B2010',
  'B2030: mixtures of wastes classified under Basel entry B2030',
  'B3020: mixtures of wastes classified under Basel entry B3020 restricted to unbleached paper or paperboard or of corrugated paper or paperboard, other paper or paperboard, made mainly of bleached chemical pulp, not coloured in the mass, paper or paperboard made mainly of mechanical pulp (for example, newspapers, journals and similar printed matter)',
  'B3030: mixtures of wastes classified under Basel entry B3030',
  'B3040: mixtures of wastes classified under Basel entry B3040',
  'B3050: mixtures of wastes classified under Basel entry B3050'
]

if ($('#annex-iiia-typeahead-container').length > 0) {
  element = document.querySelector('#annex-iiia-typeahead-container')
  id = 'annex-iiia-typeahead' // To match it to the existing <label>.

  accessibleAutocomplete ({
    element: element,
    defaultValue: element.getAttribute('data-default-value'),
    id: id,
    name: id,
    source: annexIIIA,
    minLength: 1,
    showAllValues: true,
    dropdownArrow: () => ''
  })
}

// Basel Annex IIIB autocomplete
const annexIIIB = [
  '0000: Not applicable',
  'BEU04: Composite packaging consisting of mainly paper and some plastic, not containing residues and not covered by Basel entry B3020',
  'BEU05: Clean biodegradable waste from agriculture, horticulture, forestry, gardens, parks and cemeteries'
]

if ($('#annex-iiib-typeahead-container').length > 0) {
  element = document.querySelector('#annex-iiib-typeahead-container')
  id = 'annex-iiib-typeahead' // To match it to the existing <label>.

  accessibleAutocomplete ({
    element: element,
    defaultValue: element.getAttribute('data-default-value'),
    id: id,
    name: id,
    source: annexIIIB,
    minLength: 1,
    showAllValues: true,
    dropdownArrow: () => ''
  })
}

// EC wastes autocomplete
const ecWastes = [
  '0000: Not applicable',
  '010101: wastes from mineral metalliferous excavation',
  '010102: wastes from mineral non-metalliferous excavation',
  '010304*: acid-generating tailings from processing of sulphide ore',
  '010305*: other tailings containing hazardous substances',
  '010306: tailings other than those mentioned in 01 03 04 and 01 03 05',
  '010307*: other wastes containing hazardous substances from physical and chemical processing of metalliferous minerals',
  '010308: dusty and powdery wastes other than those mentioned in 01 03 07',
  '010309: red mud from alumina production other than the wastes mentioned in 01 03 10',
  '010310*: red mud from alumina production containing hazardous substances other than the wastes mentioned in 01 03 07',
  '010399: wastes not otherwise specified',
  '010407*: wastes containing hazardous substances from physical and chemical processing of non-metalliferous minerals',
  '010408: waste gravel and crushed rocks other than those mentioned in 01 04 07',
  '010409: waste sand and clays',
  '010410: dusty and powdery wastes other than those mentioned in 01 04 07',
  '010411: wastes from potash and rock salt processing other than those mentioned in 01 04 07',
  '010412: tailings and other wastes from washing and cleaning of minerals other than those mentioned in 01 04 07 and 01 04 11',
  '010413: wastes from stone cutting and sawing other than those mentioned in 01 04 07',
  '010499: wastes not otherwise specified',
  '010504: freshwater drilling muds and wastes',
  '010505*: oil-containing drilling muds and wastes',
  '010506*: drilling muds and other drilling wastes containing hazardous substances',
  '010507: barite-containing drilling muds and wastes other than those mentioned in 01 05 05 and 01 05 06',
  '010508: chloride-containing drilling muds and wastes other than those mentioned in 01 05 05 and 01 05 06',
  '010599: wastes not otherwise specified',
  '020101: sludges from washing and cleaning',
  '020102: animal-tissue waste',
  '020103: plant-tissue waste',
  '020104: waste plastics (except packaging)',
  '020106: animal faeces, urine and manure (including spoiled straw), effluent, collected separately and treated off-site',
  '020107: wastes from forestry',
  '020108*: agrochemical waste containing hazardous substances',
  '020109: agrochemical waste other than those mentioned in 02 01 08',
  '020110: waste metal',
  '020199: wastes not otherwise specified',
  '020201: sludges from washing and cleaning',
  '020202: animal-tissue waste',
  '020203: materials unsuitable for consumption or processing',
  '020204: sludges from on-site effluent treatment',
  '020299: wastes not otherwise specified',
  '020301: sludges from washing, cleaning, peeling, centrifuging and separation',
  '020302: wastes from preserving agents',
  '020303: wastes from solvent extraction',
  '020304: materials unsuitable for consumption or processing',
  '020305: sludges from on-site effluent treatment',
  '020399: wastes not otherwise specified',
  '020401: soil from cleaning and washing beet',
  '020402: off-specification calcium carbonate',
  '020403: sludges from on-site effluent treatment',
  '020499: wastes not otherwise specified',
  '020501: materials unsuitable for consumption or processing',
  '020502: sludges from on-site effluent treatment',
  '020599: wastes not otherwise specified',
  '020601: materials unsuitable for consumption or processing',
  '020602: wastes from preserving agents',
  '020603: sludges from on-site effluent treatment',
  '020699: wastes not otherwise specified',
  '020701: wastes from washing, cleaning and mechanical reduction of raw materials',
  '020702: wastes from spirits distillation',
  '020703: wastes from chemical treatment',
  '020704: materials unsuitable for consumption or processing',
  '020705: sludges from on-site effluent treatment',
  '020799: wastes not otherwise specified',
  '030101: waste bark and cork',
  '030104*: sawdust, shavings, cuttings, wood, particle board and veneer containing hazardous substances',
  '030105: sawdust, shavings, cuttings, wood, particle board and veneer other than those mentioned in 03 01 04',
  '030199: wastes not otherwise specified',
  '030201*: non-halogenated organic wood preservatives',
  '030202*: organochlorinated wood preservatives',
  '030203*: organometallic wood preservatives',
  '030204*: inorganic wood preservatives',
  '030205*: other wood preservatives containing hazardous substances',
  '030299: wood preservatives not otherwise specified',
  '030301: waste bark and wood',
  '030302: green liquor sludge (from recovery of cooking liquor)',
  '030305: de-inking sludges from paper recycling',
  '030307: mechanically separated rejects from pulping of waste paper and cardboard',
  '030308: wastes from sorting of paper and cardboard destined for recycling',
  '030309: lime mud waste',
  '030310: fibre rejects, fibre-, filler- and coating-sludges from mechanical separation',
  '030311: sludges from on-site effluent treatment other than those mentioned in 03 03 10',
  '030399: wastes not otherwise specified',
  '040101: fleshings and lime split wastes',
  '040102: liming waste',
  '040103*: degreasing wastes containing solvents without a liquid phase',
  '040104: tanning liquor containing chromium',
  '040105: tanning liquor free of chromium',
  '040106: sludges, in particular from on-site effluent treatment containing chromium',
  '040107: sludges, in particular from on-site effluent treatment free of chromium',
  '040108: waste tanned leather (blue sheetings, shavings, cuttings, buffing dust) containing chromium',
  '040109: wastes from dressing and finishing',
  '040199: wastes not otherwise specified',
  '040209: wastes from composite materials (impregnated textile, elastomer, plastomer)',
  '040210: organic matter from natural products (for example grease, wax)',
  '040214*: wastes from finishing containing organic solvents',
  '040215: wastes from finishing other than those mentioned in 04 02 14',
  '040216*: dyestuffs and pigments containing hazardous substances',
  '040217: dyestuffs and pigments other than those mentioned in 04 02 16',
  '040219*: sludges from on-site effluent treatment containing hazardous substances',
  '040220: sludges from on-site effluent treatment other than those mentioned in 04 02 19',
  '040221: wastes from unprocessed textile fibres',
  '040222: wastes from processed textile fibres',
  '040299: wastes not otherwise specified',
  '050102*: desalter sludges',
  '050103*: tank bottom sludges',
  '050104*: acid alkyl sludges',
  '050105*: oil spills',
  '050106*: oily sludges from maintenance operations of the plant or equipment',
  '050107*: acid tars',
  '050108*: other tars',
  '050109*: sludges from on-site effluent treatment containing hazardous substances',
  '050110: sludges from on-site effluent treatment other than those mentioned in 05 01 09',
  '050111*: wastes from cleaning of fuels with bases',
  '050112*: oil containing acids',
  '050113: boiler feedwater sludges',
  '050114: wastes from cooling columns',
  '050115*: spent filter clays',
  '050116: sulphur-containing wastes from petroleum desulphurisation',
  '050117: bitumen',
  '050199: wastes not otherwise specified',
  '050601*: acid tars',
  '050603*: other tars',
  '050604: waste from cooling columns',
  '050699: wastes not otherwise specified',
  '050701*: wastes containing mercury',
  '050702: wastes containing sulphur',
  '050799: wastes not otherwise specified',
  '060101*: sulphuric acid and sulphurous acid',
  '060102*: hydrochloric acid',
  '060103*: hydrofluoric acid',
  '060104*: phosphoric and phosphorous acid',
  '060105*: nitric acid and nitrous acid',
  '060106*: other acids',
  '060199: wastes not otherwise specified',
  '060201*: calcium hydroxide',
  '060203*: ammonium hydroxide',
  '060204*: sodium and potassium hydroxide',
  '060205*: other bases',
  '060299: wastes not otherwise specified',
  '060311*: solid salts and solutions containing cyanides',
  '060313*: solid salts and solutions containing heavy metals',
  '060314: solid salts and solutions other than those mentioned in 06 03 11 and 06 03 13',
  '060315*: metallic oxides containing heavy metals',
  '060316: metallic oxides other than those mentioned in 06 03 15',
  '060399: wastes not otherwise specified',
  '060403*: wastes containing arsenic',
  '060404*: wastes containing mercury',
  '060405*: wastes containing other heavy metals',
  '060499: wastes not otherwise specified',
  '060502*: sludges from on-site effluent treatment containing hazardous substances',
  '060503: sludges from on-site effluent treatment other than those mentioned in 06 05 02',
  '060602*: wastes containing hazardous sulphides',
  '060603: wastes containing sulphides other than those mentioned in 06 06 02',
  '060699: wastes not otherwise specified',
  '060701*: wastes containing asbestos from electrolysis',
  '060702*: activated carbon from chlorine production',
  '060703*: barium sulphate sludge containing mercury',
  '060704*: solutions and acids, for example contact acid',
  '060799: wastes not otherwise specified',
  '060802*: waste containing hazardous chlorosilanes',
  '060899: wastes not otherwise specified',
  '060902: phosphorous slag',
  '060903*: calcium-based reaction wastes containing or contaminated with hazardous substances',
  '060904: calcium-based reaction wastes other than those mentioned in 06 09 03',
  '060999: wastes not otherwise specified',
  '061002*: wastes containing hazardous substances',
  '061099: wastes not otherwise specified',
  '061101: calcium-based reaction wastes from titanium dioxide production',
  '061199: wastes not otherwise specified',
  '061301*: inorganic plant protection products, wood-preserving agents and other biocides',
  '061302*: spent activated carbon (except 06 07 02)',
  '061303: carbon black',
  '061304*: wastes from asbestos processing',
  '061305*: soot',
  '061399: wastes not otherwise specified',
  '070101*: aqueous washing liquids and mother liquors',
  '070103*: organic halogenated solvents, washing liquids and mother liquors',
  '070104*: other organic solvents, washing liquids and mother liquors',
  '070107*: halogenated still bottoms and reaction residues',
  '070108*: other still bottoms and reaction residues',
  '070109*: halogenated filter cakes and spent absorbents',
  '070110*: other filter cakes and spent absorbents',
  '070111*: sludges from on-site effluent treatment containing hazardous substances',
  '070112: sludges from on-site effluent treatment other than those mentioned in 07 01 11',
  '070199: wastes not otherwise specified',
  '070201*: aqueous washing liquids and mother liquors',
  '070203*: organic halogenated solvents, washing liquids and mother liquors',
  '070204*: other organic solvents, washing liquids and mother liquors',
  '070207*: halogenated still bottoms and reaction residues',
  '070208*: other still bottoms and reaction residues',
  '070209*: halogenated filter cakes and spent absorbents',
  '070210*: other filter cakes and spent absorbents',
  '070211*: sludges from on-site effluent treatment containing hazardous substances',
  '070212: sludges from on-site effluent treatment other than those mentioned in 07 02 11',
  '070213: waste plastic',
  '070214*: wastes from additives containing hazardous substances',
  '070215: wastes from additives other than those mentioned in 07 02 14',
  '070216*: waste containing hazardous silicones',
  '070217: waste containing silicones other than those mentioned in 07 02 16',
  '070299: wastes not otherwise specified',
  '070301*: aqueous washing liquids and mother liquors',
  '070303*: organic halogenated solvents, washing liquids and mother liquors',
  '070304*: other organic solvents, washing liquids and mother liquors',
  '070307*: halogenated still bottoms and reaction residues',
  '070308*: other still bottoms and reaction residues',
  '070309*: halogenated filter cakes and spent absorbents',
  '070310*: other filter cakes and spent absorbents',
  '070311*: sludges from on-site effluent treatment containing hazardous substances',
  '070312: sludges from on-site effluent treatment other than those mentioned in 07 03 11',
  '070399: wastes not otherwise specified',
  '070401*: aqueous washing liquids and mother liquors',
  '070403*: organic halogenated solvents, washing liquids and mother liquors',
  '070404*: other organic solvents, washing liquids and mother liquors',
  '070407*: halogenated still bottoms and reaction residues',
  '070408*: other still bottoms and reaction residues',
  '070409*: halogenated filter cakes and spent absorbents',
  '070410*: other filter cakes and spent absorbents',
  '070411*: sludges from on-site effluent treatment containing hazardous substances',
  '070412: sludges from on-site effluent treatment other than those mentioned in 07 04 11',
  '070413*: solid wastes containing hazardous substances',
  '070499: wastes not otherwise specified',
  '070501*: aqueous washing liquids and mother liquors',
  '070503*: organic halogenated solvents, washing liquids and mother liquors',
  '070504*: other organic solvents, washing liquids and mother liquors',
  '070507*: halogenated still bottoms and reaction residues',
  '070508*: other still bottoms and reaction residues',
  '070509*: halogenated filter cakes and spent absorbents',
  '070510*: other filter cakes and spent absorbents',
  '070511*: sludges from on-site effluent treatment containing hazardous substances',
  '070512: sludges from on-site effluent treatment other than those mentioned in 07 05 11',
  '070513*: solid wastes containing hazardous substances',
  '070514: solid wastes other than those mentioned in 07 05 13',
  '070599: wastes not otherwise specified',
  '070601*: aqueous washing liquids and mother liquors',
  '070603*: organic halogenated solvents, washing liquids and mother liquors',
  '070604*: other organic solvents, washing liquids and mother liquors',
  '070607*: halogenated still bottoms and reaction residues',
  '070608*: other still bottoms and reaction residues',
  '070609*: halogenated filter cakes and spent absorbents',
  '070610*: other filter cakes and spent absorbents',
  '070611*: sludges from on-site effluent treatment containing hazardous substances',
  '070612: sludges from on-site effluent treatment other than those mentioned in 07 06 11',
  '070699: wastes not otherwise specified',
  '070701*: aqueous washing liquids and mother liquors',
  '070703*: organic halogenated solvents, washing liquids and mother liquors',
  '070704*: other organic solvents, washing liquids and mother liquors',
  '070707*: halogenated still bottoms and reaction residues',
  '070708*: other still bottoms and reaction residues',
  '070709*: halogenated filter cakes and spent absorbents',
  '070710*: other filter cakes and spent absorbents',
  '070711*: sludges from on-site effluent treatment containing hazardous substances',
  '070712: sludges from on-site effluent treatment other than those mentioned in 07 07 11',
  '070799: wastes not otherwise specified',
  '080111*: waste paint and varnish containing organic solvents or other hazardous substances',
  '080112: waste paint and varnish other than those mentioned in 08 01 11',
  '080113*: sludges from paint or varnish containing organic solvents or other hazardous substances',
  '080114: sludges from paint or varnish other than those mentioned in 08 01 13',
  '080115*: aqueous sludges containing paint or varnish containing organic solvents or other hazardous substances',
  '080116: aqueous sludges containing paint or varnish other than those mentioned in 08 01 15',
  '080117*: wastes from paint or varnish removal containing organic solvents or other hazardous substances',
  '080118: wastes from paint or varnish removal other than those mentioned in 08 01 17',
  '080119*: aqueous suspensions containing paint or varnish containing organic solvents or other hazardous substances',
  '080120: aqueous suspensions containing paint or varnish other than those mentioned in 08 01 19',
  '080121*: waste paint or varnish remover',
  '080199: wastes not otherwise specified',
  '080201: waste coating powders',
  '080202: aqueous sludges containing ceramic materials',
  '080203: aqueous suspensions containing ceramic materials',
  '080299: wastes not otherwise specified',
  '080307: aqueous sludges containing ink',
  '080308: aqueous liquid waste containing ink',
  '080312*: waste ink containing hazardous substances',
  '080313: waste ink other than those mentioned in 08 03 12',
  '080314*: ink sludges containing hazardous substances',
  '080315: ink sludges other than those mentioned in 08 03 14',
  '080316*: waste etching solutions',
  '080317*: waste printing toner containing hazardous substances',
  '080318: waste printing toner other than those mentioned in 08 03 17',
  '080319*: disperse oil',
  '080399: wastes not otherwise specified',
  '080409*: waste adhesives and sealants containing organic solvents or other hazardous substances',
  '080410: waste adhesives and sealants other than those mentioned in 08 04 09',
  '080411*: adhesive and sealant sludges containing organic solvents or other hazardous substances',
  '080412: adhesive and sealant sludges other than those mentioned in 08 04 11',
  '080413*: aqueous sludges containing adhesives or sealants containing organic solvents or other hazardous substances',
  '080414: aqueous sludges containing adhesives or sealants other than those mentioned in 08 04 13',
  '080415*: aqueous liquid waste containing adhesives or sealants containing organic solvents or other hazardous substances',
  '080416: aqueous liquid waste containing adhesives or sealants other than those mentioned in 08 04 15',
  '080417*: rosin oil',
  '080499: wastes not otherwise specified',
  '080501*: waste isocyanates',
  '090101*: water-based developer and activator solutions',
  '090102*: water-based offset plate developer solutions',
  '090103*: solvent-based developer solutions',
  '090104*: fixer solutions',
  '090105*: bleach solutions and bleach fixer solutions',
  '090106*: wastes containing silver from on-site treatment of photographic wastes',
  '090107: photographic film and paper containing silver or silver compounds',
  '090108: photographic film and paper free of silver or silver compounds',
  '090110: single-use cameras without batteries',
  '090111*: single-use cameras containing batteries included in 16 06 01, 16 06 02 or 16 06 03',
  '090112: single-use cameras containing batteries other than those mentioned in 09 01 11',
  '090113*: aqueous liquid waste from on-site reclamation of silver other than those mentioned in 09 01 06',
  '090199: wastes not otherwise specified',
  '100101: bottom ash, slag and boiler dust (excluding boiler dust mentioned in 10 01 04)',
  '100102: coal fly ash',
  '100103: fly ash from peat and untreated wood',
  '100104*: oil fly ash and boiler dust',
  '100105: calcium-based reaction wastes from flue-gas desulphurisation in solid form',
  '100107: calcium-based reaction wastes from flue-gas desulphurisation in sludge form',
  '100109*: sulphuric acid',
  '100113*: fly ash from emulsified hydrocarbons used as fuel',
  '100114*: bottom ash, slag and boiler dust from co-incineration containing hazardous substances',
  '100115: bottom ash, slag and boiler dust from co-incineration other than those mentioned in 10 01 14',
  '100116*: fly ash from co-incineration containing hazardous substances',
  '100117: fly ash from co-incineration other than those mentioned in 10 01 16',
  '100118*: wastes from gas cleaning containing hazardous substances',
  '100119: wastes from gas cleaning other than those mentioned in 10 01 05, 10 01 07 and 10 01 18',
  '100120*: sludges from on-site effluent treatment containing hazardous substances',
  '100121: sludges from on-site effluent treatment other than those mentioned in 10 01 20',
  '100122*: aqueous sludges from boiler cleansing containing hazardous substances',
  '100123: aqueous sludges from boiler cleansing other than those mentioned in 10 01 22',
  '100124: sands from fluidised beds',
  '100125: wastes from fuel storage and preparation of coal-fired power plants',
  '100126: wastes from cooling-water treatment',
  '100199: wastes not otherwise specified',
  '100201: wastes from the processing of slag',
  '100202: unprocessed slag',
  '100207*: solid wastes from gas treatment containing hazardous substances',
  '100208: solid wastes from gas treatment other than those mentioned in 10 02 07',
  '100210: mill scales',
  '100211*: wastes from cooling-water treatment containing oil',
  '100212: wastes from cooling-water treatment other than those mentioned in 10 02 11',
  '100213*: sludges and filter cakes from gas treatment containing hazardous substances',
  '100214: sludges and filter cakes from gas treatment other than those mentioned in 10 02 13',
  '100215: other sludges and filter cakes',
  '100299: wastes not otherwise specified',
  '100302: anode scraps',
  '100304*: primary production slags',
  '100305: waste alumina',
  '100308*: salt slags from secondary production',
  '100309*: black drosses from secondary production',
  '100315*: skimmings that are flammable or emit, upon contact with water, flammable gases in hazardous quantities',
  '100316: skimmings other than those mentioned in 10 03 15',
  '100317*: tar-containing wastes from anode manufacture',
  '100318: carbon-containing wastes from anode manufacture other than those mentioned in 10 03 17',
  '100319*: flue-gas dust containing hazardous substances',
  '100320: flue-gas dust other than those mentioned in 10 03 19',
  '100321*: other particulates and dust (including ball-mill dust) containing hazardous substances',
  '100322: other particulates and dust (including ball-mill dust) other than those mentioned in 10 03 21',
  '100323*: solid wastes from gas treatment containing hazardous substances',
  '100324: solid wastes from gas treatment other than those mentioned in 10 03 23',
  '100325*: sludges and filter cakes from gas treatment containing hazardous substances',
  '100326: sludges and filter cakes from gas treatment other than those mentioned in 10 03 25',
  '100327*: wastes from cooling-water treatment containing oil',
  '100328: wastes from cooling-water treatment other than those mentioned in 10 03 27',
  '100329*: wastes from treatment of salt slags and black drosses containing hazardous substances',
  '100330: wastes from treatment of salt slags and black drosses other than those mentioned in 10 03 29',
  '100399: wastes not otherwise specified',
  '100401*: slags from primary and secondary production',
  '100402*: dross and skimmings from primary and secondary production',
  '100403*: calcium arsenate',
  '100404*: flue-gas dust',
  '100405*: other particulates and dust',
  '100406*: solid wastes from gas treatment',
  '100407*: sludges and filter cakes from gas treatment',
  '100409*: wastes from cooling-water treatment containing oil',
  '100410: wastes from cooling-water treatment other than those mentioned in 10 04 09',
  '100499: wastes not otherwise specified',
  '100501: slags from primary and secondary production',
  '100503*: flue-gas dust',
  '100504: other particulates and dust',
  '100505*: solid waste from gas treatment',
  '100506*: sludges and filter cakes from gas treatment',
  '100508*: wastes from cooling-water treatment containing oil',
  '100509: wastes from cooling-water treatment other than those mentioned in 10 05 08',
  '100510*: dross and skimmings that are flammable or emit, upon contact with water, flammable gases in hazardous quantities',
  '100511: dross and skimmings other than those mentioned in 10 05 10',
  '100599: wastes not otherwise specified',
  '100601: slags from primary and secondary production',
  '100602: dross and skimmings from primary and secondary production',
  '100603*: flue-gas dust',
  '100604: other particulates and dust',
  '100606*: solid wastes from gas treatment',
  '100607*: sludges and filter cakes from gas treatment',
  '100609*: wastes from cooling-water treatment containing oil',
  '100610: wastes from cooling-water treatment other than those mentioned in 10 06 09',
  '100699: wastes not otherwise specified',
  '100701: slags from primary and secondary production',
  '100702: dross and skimmings from primary and secondary production',
  '100703: solid wastes from gas treatment',
  '100704: other particulates and dust',
  '100705: sludges and filter cakes from gas treatment',
  '100707*: wastes from cooling-water treatment containing oil',
  '100708: wastes from cooling-water treatment other than those mentioned in 10 07 07',
  '100799: wastes not otherwise specified',
  '100804: particulates and dust',
  '100808*: salt slag from primary and secondary production',
  '100809: other slags',
  '100810*: dross and skimmings that are flammable or emit, upon contact with water, flammable gases in hazardous quantities',
  '100811: dross and skimmings other than those mentioned in 10 08 10',
  '100812*: tar-containing wastes from anode manufacture',
  '100813: carbon-containing wastes from anode manufacture other than those mentioned in 10 08 12',
  '100814: anode scrap',
  '100815*: flue-gas dust containing hazardous substances',
  '100816: flue-gas dust other than those mentioned in 10 08 15',
  '100817*: sludges and filter cakes from flue-gas treatment containing hazardous substances',
  '100818: sludges and filter cakes from flue-gas treatment other than those mentioned in 10 08 17',
  '100819*: wastes from cooling-water treatment containing oil',
  '100820: wastes from cooling-water treatment other than those mentioned in 10 08 19',
  '100899: wastes not otherwise specified',
  '100903: furnace slag',
  '100905*: casting cores and moulds which have not undergone pouring containing hazardous substances',
  '100906: casting cores and moulds which have not undergone pouring other than those mentioned in 10 09 05',
  '100907*: casting cores and moulds which have undergone pouring containing hazardous substances',
  '100908: casting cores and moulds which have undergone pouring other than those mentioned in 10 09 07',
  '100909*: flue-gas dust containing hazardous substances',
  '100910: flue-gas dust other than those mentioned in 10 09 09',
  '100911*: other particulates containing hazardous substances',
  '100912: other particulates other than those mentioned in 10 09 11',
  '100913*: waste binders containing hazardous substances',
  '100914: waste binders other than those mentioned in 10 09 13',
  '100915*: waste crack-indicating agent containing hazardous substances',
  '100916: waste crack-indicating agent other than those mentioned in 10 09 15',
  '100999: wastes not otherwise specified',
  '101003: furnace slag',
  '101005*: casting cores and moulds which have not undergone pouring, containing hazardous substances',
  '101006: casting cores and moulds which have not undergone pouring, other than those mentioned in 10 10 05',
  '101007*: casting cores and moulds which have undergone pouring, containing hazardous substances',
  '101008: casting cores and moulds which have undergone pouring, other than those mentioned in 10 10 07',
  '101009*: flue-gas dust containing hazardous substances',
  '101010: flue-gas dust other than those mentioned in 10 10 09',
  '101011*: other particulates containing hazardous substances',
  '101012: other particulates other than those mentioned in 10 10 11',
  '101013*: waste binders containing hazardous substances',
  '101014: waste binders other than those mentioned in 10 10 13',
  '101015*: waste crack-indicating agent containing hazardous substances',
  '101016: waste crack-indicating agent other than those mentioned in 10 10 15',
  '101099: wastes not otherwise specified',
  '101103: waste glass-based fibrous materials',
  '101105: particulates and dust',
  '101109*: waste preparation mixture before thermal processing, containing hazardous substances',
  '101110: waste preparation mixture before thermal processing, other than those mentioned in 10 11 09',
  '101111*: waste glass in small particles and glass powder containing heavy metals (for example from cathode ray tubes)',
  '101112: waste glass other than those mentioned in 10 11 11',
  '101113*: glass-polishing and -grinding sludge containing hazardous substances',
  '101114: glass-polishing and -grinding sludge other than those mentioned in 10 11 13',
  '101115*: solid wastes from flue-gas treatment containing hazardous substances',
  '101116: solid wastes from flue-gas treatment other than those mentioned in 10 11 15',
  '101117*: sludges and filter cakes from flue-gas treatment containing hazardous substances',
  '101118: sludges and filter cakes from flue-gas treatment other than those mentioned in 10 11 17',
  '101119*: solid wastes from on-site effluent treatment containing hazardous substances',
  '101120: solid wastes from on-site effluent treatment other than those mentioned in 10 11 19',
  '101199: wastes not otherwise specified',
  '101201: waste preparation mixture before thermal processing',
  '101203: particulates and dust',
  '101205: sludges and filter cakes from gas treatment',
  '101206: discarded moulds',
  '101208: waste ceramics, bricks, tiles and construction products (after thermal processing)',
  '101209*: solid wastes from gas treatment containing hazardous substances',
  '101210: solid wastes from gas treatment other than those mentioned in 10 12 09',
  '101211*: wastes from glazing containing heavy metals',
  '101212: wastes from glazing other than those mentioned in 10 12 11',
  '101213: sludge from on-site effluent treatment',
  '101299: wastes not otherwise specified',
  '101301: waste preparation mixture before thermal processing',
  '101304: wastes from calcination and hydration of lime',
  '101306: particulates and dust (except 10 13 12 and 10 13 13)',
  '101307: sludges and filter cakes from gas treatment',
  '101309*: wastes from asbestos-cement manufacture containing asbestos',
  '101310: wastes from asbestos-cement manufacture other than those mentioned in 10 13 09',
  '101311: wastes from cement-based composite materials other than those mentioned in 10 13 09 and 10 13 10',
  '101312*: solid wastes from gas treatment containing hazardous substances',
  '101313: solid wastes from gas treatment other than those mentioned in 10 13 12',
  '101314: waste concrete and concrete sludge',
  '101399: wastes not otherwise specified',
  '101401*: waste from gas cleaning containing mercury',
  '110105*: pickling acids',
  '110106*: acids not otherwise specified',
  '110107*: pickling bases',
  '110108*: phosphatising sludges',
  '110109*: sludges and filter cakes containing hazardous substances',
  '110110: sludges and filter cakes other than those mentioned in 11 01 09',
  '110111*: aqueous rinsing liquids containing hazardous substances',
  '110112: aqueous rinsing liquids other than those mentioned in 11 01 11',
  '110113*: degreasing wastes containing hazardous substances',
  '110114: degreasing wastes other than those mentioned in 11 01 13',
  '110115*: eluate and sludges from membrane systems or ion exchange systems containing hazardous substances',
  '110116*: saturated or spent ion exchange resins',
  '110198*: other wastes containing hazardous substances',
  '110199: wastes not otherwise specified',
  '110202*: sludges from zinc hydrometallurgy (including jarosite, goethite)',
  '110203: wastes from the production of anodes for aqueous electrolytical processes',
  '110205*: wastes from copper hydrometallurgical processes containing hazardous substances',
  '110206: wastes from copper hydrometallurgical processes other than those mentioned in 11 02 05',
  '110207*: other wastes containing hazardous substances',
  '110299: wastes not otherwise specified',
  '110301*: wastes containing cyanide',
  '110302*: other wastes',
  '110501: hard zinc',
  '110502: zinc ash',
  '110503*: solid wastes from gas treatment',
  '110504*: spent flux',
  '110599: wastes not otherwise specified',
  '120101: ferrous metal filings and turnings',
  '120102: ferrous metal dust and particles',
  '120103: non-ferrous metal filings and turnings',
  '120104: non-ferrous metal dust and particles',
  '120105: plastics shavings and turnings',
  '120106*: mineral-based machining oils containing halogens (except emulsions and solutions)',
  '120107*: mineral-based machining oils free of halogens (except emulsions and solutions)',
  '120108*: machining emulsions and solutions containing halogens',
  '120109*: machining emulsions and solutions free of halogens',
  '120110*: synthetic machining oils',
  '120112*: spent waxes and fats',
  '120113: welding wastes',
  '120114*: machining sludges containing hazardous substances',
  '120115: machining sludges other than those mentioned in 12 01 14',
  '120116*: waste blasting material containing hazardous substances',
  '120117: waste blasting material other than those mentioned in 12 01 16',
  '120118*: metal sludge (grinding, honing and lapping sludge) containing oil',
  '120119*: readily biodegradable machining oil',
  '120120*: spent grinding bodies and grinding materials containing hazardous substances',
  '120121: spent grinding bodies and grinding materials other than those mentioned in 12 01 20',
  '120199: wastes not otherwise specified',
  '120301*: aqueous washing liquids',
  '120302*: steam degreasing wastes',
  '130101*: hydraulic oils, containing PCBs',
  '130104*: chlorinated emulsions',
  '130105*: non-chlorinated emulsions',
  '130109*: mineral-based chlorinated hydraulic oils',
  '130110*: mineral based non-chlorinated hydraulic oils',
  '130111*: synthetic hydraulic oils',
  '130112*: readily biodegradable hydraulic oils',
  '130113*: other hydraulic oils',
  '130204*: mineral-based chlorinated engine, gear and lubricating oils',
  '130205*: mineral-based non-chlorinated engine, gear and lubricating oils',
  '130206*: synthetic engine, gear and lubricating oils',
  '130207*: readily biodegradable engine, gear and lubricating oils',
  '130208*: other engine, gear and lubricating oils',
  '130301*: insulating or heat transmission oils containing PCBs',
  '130306*: mineral-based chlorinated insulating and heat transmission oils other than those mentioned in 13 03 01',
  '130307*: mineral-based non-chlorinated insulating and heat transmission oils',
  '130308*: synthetic insulating and heat transmission oils',
  '130309*: readily biodegradable insulating and heat transmission oils',
  '130310*: other insulating and heat transmission oils',
  '130401*: bilge oils from inland navigation',
  '130402*: bilge oils from jetty sewers',
  '130403*: bilge oils from other navigation',
  '130501*: solids from grit chambers and oil/water separators',
  '130502*: sludges from oil/water separators',
  '130503*: interceptor sludges',
  '130506*: oil from oil/water separators',
  '130507*: oily water from oil/water separators',
  '130508*: mixtures of wastes from grit chambers and oil/water separators',
  '130701*: fuel oil and diesel',
  '130702*: petrol',
  '130703*: other fuels (including mixtures)',
  '130801*: desalter sludges or emulsions',
  '130802*: other emulsions',
  '130899*: wastes not otherwise specified',
  '140601*: chlorofluorocarbons, HCFC, HFC',
  '140602*: other halogenated solvents and solvent mixtures',
  '140603*: other solvents and solvent mixtures',
  '140604*: sludges or solid wastes containing halogenated solvents',
  '140605*: sludges or solid wastes containing other solvents',
  '150101: paper and cardboard packaging',
  '150102: plastic packaging',
  '150103: wooden packaging',
  '150104: metallic packaging',
  '150105: composite packaging',
  '150106: mixed packaging',
  '150107: glass packaging',
  '150109: textile packaging',
  '150110*: packaging containing residues of or contaminated by hazardous substances',
  '150111*: metallic packaging containing a hazardous solid porous matrix (for example asbestos), including empty pressure containers',
  '150202*: absorbents, filter materials (including oil filters not otherwise specified), wiping cloths, protective clothing contaminated by hazardous substances',
  '150203: absorbents, filter materials, wiping cloths and protective clothing other than those mentioned in 15 02 02',
  '160103: end-of-life tyres',
  '160104*: end-of-life vehicles',
  '160106: end-of-life vehicles, containing neither liquids nor other hazardous components',
  '160107*: oil filters',
  '160108*: components containing mercury',
  '160109*: components containing PCBs',
  '160110*: explosive components (for example air bags)',
  '160111*: brake pads containing asbestos',
  '160112: brake pads other than those mentioned in 16 01 11',
  '160113*: brake fluids',
  '160114*: antifreeze fluids containing hazardous substances',
  '160115: antifreeze fluids other than those mentioned in 16 01 14',
  '160116: tanks for liquefied gas',
  '160117: ferrous metal',
  '160118: non-ferrous metal',
  '160119: plastic',
  '160120: glass',
  '160121*: hazardous components other than those mentioned in 16 01 07 to 16 01 11 and 16 01 13 and 16 01 14',
  '160122: components not otherwise specified',
  '160199: wastes not otherwise specified',
  '160209*: transformers and capacitors containing PCBs',
  '160210*: discarded equipment containing or contaminated by PCBs other than those mentioned in 16 02 09',
  '160211*: discarded equipment containing chlorofluorocarbons, HCFC, HFC',
  '160212*: discarded equipment containing free asbestos',
  '160213*: discarded equipment containing hazardous componentsother than those mentioned in 16 02 09 to 16 02 12',
  '160214: discarded equipment other than those mentioned in 16 02 09 to 16 02 13',
  '160215*: hazardous components removed from discarded equipment',
  '160216: components removed from discarded equipment other than those mentioned in 16 02 15',
  '160303*: inorganic wastes containing hazardous substances',
  '160304: inorganic wastes other than those mentioned in 16 03 03',
  '160305*: organic wastes containing hazardous substances',
  '160306: organic wastes other than those mentioned in 16 03 05',
  '160307*: metallic mercury',
  '160401*: waste ammunition',
  '160402*: fireworks wastes',
  '160403*: other waste explosives',
  '160504*: gases in pressure containers (including halons) containing hazardous substances',
  '160505: gases in pressure containers other than those mentioned in 16 05 04',
  '160506*: laboratory chemicals, consisting of or containing hazardous substances, including mixtures of laboratory chemicals',
  '160507*: discarded inorganic chemicals consisting of or containing hazardous substances',
  '160508*: discarded organic chemicals consisting of or containing hazardous substances',
  '160509: discarded chemicals other than those mentioned in 16 05 06, 16 05 07 or 16 05 08',
  '160601*: lead batteries',
  '160602*: Ni-Cd batteries',
  '160603*: mercury-containing batteries',
  '160604: alkaline batteries (except 16 06 03)',
  '160605: other batteries and accumulators',
  '160606*: separately collected electrolyte from batteries and accumulators',
  '160708*: wastes containing oil',
  '160709*: wastes containing other hazardous substances',
  '160799: wastes not otherwise specified',
  '160801: spent catalysts containing gold, silver, rhenium, rhodium, palladium, iridium or platinum (except 16 08 07)',
  '160802*: spent catalysts containing hazardous transition metals or hazardous transition metal compounds',
  '160803: spent catalysts containing transition metals or transition metal compounds not otherwise specified',
  '160804: spent fluid catalytic cracking catalysts (except 16 08 07)',
  '160805*: spent catalysts containing phosphoric acid',
  '160806*: spent liquids used as catalysts',
  '160807*: spent catalysts contaminated with hazardous substances',
  '160901*: permanganates, for example potassium permanganate',
  '160902*: chromates, for example potassium chromate, potassium or sodium dichromate',
  '160903*: peroxides, for example hydrogen peroxide',
  '160904*: oxidising substances, not otherwise specified',
  '161001*: aqueous liquid wastes containing hazardous substances',
  '161002: aqueous liquid wastes other than those mentioned in 16 10 01',
  '161003*: aqueous concentrates containing hazardous substances',
  '161004: aqueous concentrates other than those mentioned in 16 10 03',
  '161101*: carbon-based linings and refractories from metallurgical processes containing hazardous substances',
  '161102: carbon-based linings and refractories from metallurgical processes others than those mentioned in 16 11 01',
  '161103*: other linings and refractories from metallurgical processes containing hazardous substances',
  '161104: other linings and refractories from metallurgical processes other than those mentioned in 16 11 03',
  '161105*: linings and refractories from non-metallurgical processes containing hazardous substances',
  '161106: linings and refractories from non-metallurgical processes others than those mentioned in 16 11 05',
  '170101: concrete',
  '170102: bricks',
  '170103: tiles and ceramics',
  '170106*: mixtures of, or separate fractions of concrete, bricks, tiles and ceramics containing hazardous substances',
  '170107: mixtures of concrete, bricks, tiles and ceramics other than those mentioned in 17 01 06',
  '170201: wood',
  '170202: glass',
  '170203: plastic',
  '170204*: glass, plastic and wood containing or contaminated with hazardous substances',
  '170301*: bituminous mixtures containing coal tar',
  '170302: bituminous mixtures other than those mentioned in 17 03 01',
  '170303*: coal tar and tarred products',
  '170401: copper, bronze, brass',
  '170402: aluminium',
  '170403: lead',
  '170404: zinc',
  '170405: iron and steel',
  '170406: tin',
  '170407: mixed metals',
  '170409*: metal waste contaminated with hazardous substances',
  '170410*: cables containing oil, coal tar and other hazardous substances',
  '170411: cables other than those mentioned in 17 04 10',
  '170503*: soil and stones containing hazardous substances',
  '170504: soil and stones other than those mentioned in 17 05 03',
  '170505*: dredging spoil containing hazardous substances',
  '170506: dredging spoil other than those mentioned in 17 05 05',
  '170507*: track ballast containing hazardous substances',
  '170508: track ballast other than those mentioned in 17 05 07',
  '170601*: insulation materials containing asbestos',
  '170603*: other insulation materials consisting of or containing hazardous substances',
  '170604: insulation materials other than those mentioned in 17 06 01 and 17 06 03',
  '170605*: construction materials containing asbestos',
  '170801*: gypsum-based construction materials contaminated with hazardous substances',
  '170802: gypsum-based construction materials other than those mentioned in 17 08 01',
  '170901*: construction and demolition wastes containing mercury',
  '170902*: construction and demolition wastes containing PCB (for example PCB- containing sealants, PCB-containing resin-based floorings, PCB-containing sealed glazing units, PCB-containing capacitors)',
  '170903*: other construction and demolition wastes (including mixed wastes) containing hazardous substances',
  '170904: mixed construction and demolition wastes other than those mentioned in 17 09 01, 17 09 02 and 17 09 03',
  '180101: sharps (except 18 01 03)',
  '180102: body parts and organs including blood bags and blood preserves (except 18 01 03)',
  '180103*: wastes whose collection and disposal is subject to special requirements in order to prevent infection',
  '180104: wastes whose collection and disposal is not subject to special requirements in order to prevent infection (for example dressings, plaster casts, linen, disposable clothing, diapers)',
  '180106*: chemicals consisting of or containing hazardous substances',
  '180107: chemicals other than those mentioned in 18 01 06',
  '180108*: cytotoxic and cytostatic medicines',
  '180109: medicines other than those mentioned in 18 01 08',
  '180110*: amalgam waste from dental care',
  '180201: sharps (except 18 02 02)',
  '180202*: wastes whose collection and disposal is subject to special requirements in order to prevent infection',
  '180203: wastes whose collection and disposal is not subject to special requirements in order to prevent infection',
  '180205*: chemicals consisting of or containing hazardous substances',
  '180206: chemicals other than those mentioned in 18 02 05',
  '180207*: cytotoxic and cytostatic medicines',
  '180208: medicines other than those mentioned in 18 02 07',
  '190102: ferrous materials removed from bottom ash',
  '190105*: filter cake from gas treatment',
  '190106*: aqueous liquid wastes from gas treatment and other aqueous liquid wastes',
  '190107*: solid wastes from gas treatment',
  '190110*: spent activated carbon from flue-gas treatment',
  '190111*: bottom ash and slag containing hazardous substances',
  '190112: bottom ash and slag other than those mentioned in 19 01 11',
  '190113*: fly ash containing hazardous substances',
  '190114: fly ash other than those mentioned in 19 01 13',
  '190115*: boiler dust containing hazardous substances',
  '190116: boiler dust other than those mentioned in 19 01 15',
  '190117*: pyrolysis wastes containing hazardous substances',
  '190118: pyrolysis wastes other than those mentioned in 19 01 17',
  '190119: sands from fluidised beds',
  '190199: wastes not otherwise specified',
  '190203: premixed wastes composed only of non-hazardous wastes',
  '190204*: premixed wastes composed of at least one hazardous waste',
  '190205*: sludges from physico/chemical treatment containing hazardous substances',
  '190206: sludges from physico/chemical treatment other than those mentioned in 19 02 05',
  '190207*: oil and concentrates from separation',
  '190208*: liquid combustible wastes containing hazardous substances',
  '190209*: solid combustible wastes containing hazardous substances',
  '190210: combustible wastes other than those mentioned in 19 02 08 and 19 02 09',
  '190211*: other wastes containing hazardous substances',
  '190299: wastes not otherwise specified',
  '190304*: wastes marked as hazardous, partly stabilised other than 19 03 08',
  '190305: stabilised wastes other than those mentioned in 19 03 04',
  '190306*: wastes marked as hazardous, solidified',
  '190307: solidified wastes other than those mentioned in 19 03 06',
  '190308*: partly stabilised mercury',
  '190401: vitrified waste',
  '190402*: fly ash and other flue-gas treatment wastes',
  '190403*: non-vitrified solid phase',
  '190404: aqueous liquid wastes from vitrified waste tempering',
  '190501: non-composted fraction of municipal and similar wastes',
  '190502: non-composted fraction of animal and vegetable waste',
  '190503: off-specification compost',
  '190599: wastes not otherwise specified',
  '190603: liquor from anaerobic treatment of municipal waste',
  '190604: digestate from anaerobic treatment of municipal waste',
  '190605: liquor from anaerobic treatment of animal and vegetable waste',
  '190606: digestate from anaerobic treatment of animal and vegetable waste',
  '190699: wastes not otherwise specified',
  '190702*: landfill leachate containing hazardous substances',
  '190703: landfill leachate other than those mentioned in 19 07 02',
  '190801: screenings',
  '190802: waste from desanding',
  '190805: sludges from treatment of urban waste water',
  '190806*: saturated or spent ion exchange resins',
  '190807*: solutions and sludges from regeneration of ion exchangers',
  '190808*: membrane system waste containing heavy metals',
  '190809: grease and oil mixture from oil/water separation containing only edible oil and fats',
  '190810*: grease and oil mixture from oil/water separation other than those mentioned in 19 08 09',
  '190811*: sludges containing hazardous substances from biological treatment of industrial waste water',
  '190812: sludges from biological treatment of industrial waste water other than those mentioned in 19 08 11',
  '190813*: sludges containing hazardous substances from other treatment of industrial waste water',
  '190814: sludges from other treatment of industrial waste water other than those mentioned in 19 08 13',
  '190899: wastes not otherwise specified',
  '190901: solid waste from primary filtration and screenings',
  '190902: sludges from water clarification',
  '190903: sludges from decarbonation',
  '190904: spent activated carbon',
  '190905: saturated or spent ion exchange resins',
  '190906: solutions and sludges from regeneration of ion exchangers',
  '190999: wastes not otherwise specified',
  '191001: iron and steel waste',
  '191002: non-ferrous waste',
  '191003*: fluff-light fraction and dust containing hazardous substances',
  '191004: fluff-light fraction and dust other than those mentioned in 19 10 03',
  '191005*: other fractions containing hazardous substances',
  '191006: other fractions other than those mentioned in 19 10 05',
  '191101*: spent filter clays',
  '191102*: acid tars',
  '191103*: aqueous liquid wastes',
  '191104*: wastes from cleaning of fuel with bases',
  '191105*: sludges from on-site effluent treatment containing hazardous substances',
  '191106: sludges from on-site effluent treatment other than those mentioned in 19 11 05',
  '191107*: wastes from flue-gas cleaning',
  '191199: wastes not otherwise specified',
  '191201: paper and cardboard',
  '191202: ferrous metal',
  '191203: non-ferrous metal',
  '191204: plastic and rubber',
  '191205: glass',
  '191206*: wood containing hazardous substances',
  '191207: wood other than that mentioned in 19 12 06',
  '191208: textiles',
  '191209: minerals (for example sand, stones)',
  '191210: combustible waste (refuse derived fuel)',
  '191211*: other wastes (including mixtures of materials) from mechanical treatment of waste containing hazardous substances',
  '191212: other wastes (including mixtures of materials) from mechanical treatment of wastes other than those mentioned in 19 12 11',
  '191301*: solid wastes from soil remediation containing hazardous substances',
  '191302: solid wastes from soil remediation other than those mentioned in 19 13 01',
  '191303*: sludges from soil remediation containing hazardous substances',
  '191304: sludges from soil remediation other than those mentioned in 19 13 03',
  '191305*: sludges from groundwater remediation containing hazardous substances',
  '191306: sludges from groundwater remediation other than those mentioned in 19 13 05',
  '191307*: aqueous liquid wastes and aqueous concentrates from groundwater remediation containing hazardous substances',
  '191308: aqueous liquid wastes and aqueous concentrates from groundwater remediation other than those mentioned in 19 13 07',
  '200101: paper and cardboard',
  '200102: glass',
  '200108: biodegradable kitchen and canteen waste',
  '200110: clothes',
  '200111: textiles',
  '200113*: solvents',
  '200114*: acids',
  '200115*: alkalines',
  '200117*: photochemicals',
  '200119*: pesticides',
  '200121*: fluorescent tubes and other mercury-containing waste',
  '200123*: discarded equipment containing chlorofluorocarbons',
  '200125: edible oil and fat',
  '200126*: oil and fat other than those mentioned in 20 01 25',
  '200127*: paint, inks, adhesives and resins containing hazardous substances',
  '200128: paint, inks, adhesives and resins other than those mentioned in 20 01 27',
  '200129*: detergents containing hazardous substances',
  '200130: detergents other than those mentioned in 20 01 29',
  '200131*: cytotoxic and cytostatic medicines',
  '200132: medicines other than those mentioned in 20 01 31',
  '200133*: batteries and accumulators included in 16 06 01, 16 06 02 or 16 06 03 and unsorted batteries and accumulators containing these batteries',
  '200134: batteries and accumulators other than those mentioned in 20 01 33',
  '200135*: discarded electrical and electronic equipment other than those mentioned in 20 01 21 and 20 01 23 containing hazardous components',
  '200136: discarded electrical and electronic equipment other than those mentioned in 20 01 21, 20 01 23 and 20 01 35',
  '200137*: wood containing hazardous substances',
  '200138: wood other than that mentioned in 20 01 37',
  '200139: plastics',
  '200140: metals',
  '200141: wastes from chimney sweeping',
  '200199: other fractions not otherwise specified',
  '200201: biodegradable waste',
  '200202: soil and stones',
  '200203: other non-biodegradable wastes',
  '200301: mixed municipal waste',
  '200302: waste from markets',
  '200303: street-cleaning residues',
  '200304: septic tank sludge',
  '200306: waste from sewage cleaning',
  '200307: bulky waste',
  '200399: municipal wastes not otherwise specified'
]

if ($('#ec-wastes-typeahead-container').length > 0) {
  element = document.querySelector('#ec-wastes-typeahead-container')
  id = 'ec-wastes-typeahead' // To match it to the existing <label>.

  accessibleAutocomplete ({
    element: element,
    defaultValue: element.getAttribute('data-default-value'),
    id: id,
    name: id,
    source: ecWastes,
    minLength: 1,
    showAllValues: true,
    dropdownArrow: () => ''
  })
}

// National code autocomplete
const nationalCode = [
  '[National code - Dummy entry 1]',
  '[National code - Dummy entry 2]',
  '[National code - Dummy entry 3]',
  '[National code - Dummy entry 4]',
  '[National code - Dummy entry 5]',
  '[National code - Dummy entry 6]',
  '[National code - Dummy entry 7]',
  '[National code - Dummy entry 8]',
  '[National code - Dummy entry 9]',
  '[National code - Dummy entry 10]'
]

if ($('#national-code-typeahead-container').length > 0) {
  element = document.querySelector('#national-code-typeahead-container')
  id = 'national-code-typeahead' // To match it to the existing <label>.

  accessibleAutocomplete ({
    element: element,
    defaultValue: element.getAttribute('data-default-value'),
    id: id,
    name: id,
    source: nationalCode,
    minLength: 1,
    showAllValues: true,
    dropdownArrow: () => ''
  })
}

// Nation autocomplete
const nationList = [
  'England',
  'Scotland',
  'Wales',
  'Northern Ireland'
]

if ($('#nation-typeahead-container').length > 0) {
  element = document.querySelector('#nation-typeahead-container')
  id = 'nation-typeahead' // To match it to the existing <label>.

  accessibleAutocomplete ({
    element: element,
    defaultValue: element.getAttribute('data-default-value'),
    id: id,
    name: id,
    source: nationList,
    minLength: 1,
    showAllValues: true,
    dropdownArrow: () => ''
  })
}

// Export/dispatch & Transit & Import/destination autocomplete
const countryList = [
  'Afghanistan (AF)',
  'Åland Islands (AX)',
  'Albania (AL)',
  'Algeria (DZ)',
  'American Samoa (AS)',
  'Andorra (AD)',
  'Angola (AO)',
  'Anguilla (AI)',
  'Antarctica (AQ)',
  'Antigua and Barbuda (AG)',
  'Argentina (AR)',
  'Armenia (AM)',
  'Aruba (AW)',
  'Australia (AU)',
  'Austria (AT)',
  'Azerbaijan (AZ)',
  'Bahamas (BS)',
  'Bahrain (BH)',
  'Bangladesh (BD)',
  'Barbados (BB)',
  'Belarus (BY)',
  'Belgium (BE)',
  'Belize (BZ)',
  'Benin (BJ)',
  'Bermuda (BM)',
  'Bhutan (BT)',
  'Bolivia, Plurinational State of (BO)',
  'Bonaire, Sint Eustatius and Saba (BQ)',
  'Bosnia and Herzegovina (BA)',
  'Botswana (BW)',
  'Bouvet Island (BV)',
  'Brazil (BR)',
  'British Indian Ocean Territory (IO)',
  'Brunei Darussalam (BN)',
  'Bulgaria (BG)',
  'Burkina Faso (BF)',
  'Burundi (BI)',
  'Cambodia (KH)',
  'Cameroon (CM)',
  'Canada (CA)',
  'Cape Verde (CV)',
  'Cayman Islands (KY)',
  'Central African Republic (CF)',
  'Chad (TD)',
  'Chile (CL)',
  'China (CN)',
  'Christmas Island (CX)',
  'Cocos (Keeling) Islands (CC)',
  'Colombia (CO)',
  'Comoros (KM)',
  'Congo (CG)',
  'Congo, the Democratic Republic of the (CD)',
  'Cook Islands (CK)',
  'Costa Rica (CR)',
  'Côte d Ivoire (CI)',
  'Croatia (HR)',
  'Cuba (CU)',
  'Curaçao (CW)',
  'Cyprus (CY)',
  'Czech Republic (CZ)',
  'Denmark (DK)',
  'Djibouti (DJ)',
  'Dominica (DM)',
  'Dominican Republic (DO)',
  'Ecuador (EC)',
  'Egypt (EG)',
  'El Salvador (SV)',
  'Equatorial Guinea (GQ)',
  'Eritrea (ER)',
  'Estonia (EE)',
  'Ethiopia (ET)',
  'Falkland Islands (Malvinas) (FK)',
  'Faroe Islands (FO)',
  'Fiji (FJ)',
  'Finland (FI)',
  'France (FR)',
  'French Guiana (GF)',
  'French Polynesia (PF)',
  'French Southern Territories (TF)',
  'Gabon (GA)',
  'Gambia (GM)',
  'Georgia (GE)',
  'Germany (DE)',
  'Ghana (GH)',
  'Gibraltar (GI)',
  'Greece (GR)',
  'Greenland (GL)',
  'Grenada (GD)',
  'Guadeloupe (GP)',
  'Guam (GU)',
  'Guatemala (GT)',
  'Guernsey (GG)',
  'Guinea (GN)',
  'Guinea-Bissau (GW)',
  'Guyana (GY)',
  'Haiti (HT)',
  'Heard Island and McDonald Islands (HM)',
  'Holy See (Vatican City State) (VA)',
  'Honduras (HN)',
  'Hong Kong (HK)',
  'Hungary (HU)',
  'Iceland (IS)',
  'India (IN)',
  'Indonesia (ID)',
  'Iran, Islamic Republic of (IR)',
  'Iraq (IQ)',
  'Ireland (IE)',
  'Isle of Man (IM)',
  'Israel (IL)',
  'Italy (IT)',
  'Jamaica (JM)',
  'Japan (JP)',
  'Jersey (JE)',
  'Jordan (JO)',
  'Kazakhstan (KZ)',
  'Kenya (KE)',
  'Kiribati (KI)',
  'Korea, Democratic Peoples Republic of (KP)',
  'Korea, Republic of (KR)',
  'Kuwait (KW)',
  'Kyrgyzstan (KG)',
  'Lao Peoples Democratic Republic (LA)',
  'Latvia (LV)',
  'Lebanon (LB)',
  'Lesotho (LS)',
  'Liberia (LR)',
  'Libya (LY)',
  'Liechtenstein (LI)',
  'Lithuania (LT)',
  'Luxembourg (LU)',
  'Macao (MO)',
  'Macedonia, the Former Yugoslav Republic of (MK)',
  'Madagascar (MG)',
  'Malawi (MW)',
  'Malaysia (MY)',
  'Maldives (MV)',
  'Mali (ML)',
  'Malta (MT)',
  'Marshall Islands (MH)',
  'Martinique (MQ)',
  'Mauritania (MR)',
  'Mauritius (MU)',
  'Mayotte (YT)',
  'Mexico (MX)',
  'Micronesia, Federated States of (FM)',
  'Moldova, Republic of (MD)',
  'Monaco (MC)',
  'Mongolia (MN)',
  'Montenegro (ME)',
  'Montserrat (MS)',
  'Morocco (MA)',
  'Mozambique (MZ)',
  'Myanmar (MM)',
  'Namibia (NA)',
  'Nauru (NR)',
  'Nepal (NP)',
  'Netherlands (NL)',
  'New Caledonia (NC)',
  'New Zealand (NZ)',
  'Nicaragua (NI)',
  'Niger (NE)',
  'Nigeria (NG)',
  'Niue (NU)',
  'Norfolk Island (NF)',
  'Northern Mariana Islands (MP)',
  'Norway (NO)',
  'Oman (OM)',
  'Pakistan (PK)',
  'Palau (PW)',
  'Palestine, State of (PS)',
  'Panama (PA)',
  'Papua New Guinea (PG)',
  'Paraguay (PY)',
  'Peru (PE)',
  'Philippines (PH)',
  'Pitcairn (PN)',
  'Poland (PL)',
  'Portugal (PT)',
  'Puerto Rico (PR)',
  'Qatar (QA)',
  'Réunion (RE)',
  'Romania (RO)',
  'Russian Federation (RU)',
  'Rwanda (RW)',
  'Saint Barthélemy (BL)',
  'Saint Helena, Ascension and Tristan da Cunha (SH)',
  'Saint Kitts and Nevis (KN)',
  'Saint Lucia (LC)',
  'Saint Martin (French part) (MF)',
  'Saint Pierre and Miquelon (PM)',
  'Saint Vincent and the Grenadines (VC)',
  'Samoa (WS)',
  'San Marino (SM)',
  'Sao Tome and Principe (ST)',
  'Saudi Arabia (SA)',
  'Senegal (SN)',
  'Serbia (RS)',
  'Seychelles (SC)',
  'Sierra Leone (SL)',
  'Singapore (SG)',
  'Sint Maarten (Dutch part) (SX)',
  'Slovakia (SK)',
  'Slovenia (SI)',
  'Solomon Islands (SB)',
  'Somalia (SO)',
  'South Africa (ZA)',
  'South Georgia and the South Sandwich Islands (GS)',
  'South Sudan (SS)',
  'Spain (ES)',
  'Sri Lanka (LK)',
  'Sudan (SD)',
  'Suriname (SR)',
  'Svalbard and Jan Mayen (SJ)',
  'Swaziland (SZ)',
  'Sweden (SE)',
  'Switzerland (CH)',
  'Syrian Arab Republic (SY)',
  'Taiwan, Province of China (TW)',
  'Tajikistan (TJ)',
  'Tanzania, United Republic of (TZ)',
  'Thailand (TH)',
  'Timor-Leste (TL)',
  'Togo (TG)',
  'Tokelau (TK)',
  'Tonga (TO)',
  'Trinidad and Tobago (TT)',
  'Tunisia (TN)',
  'Turkey (TR)',
  'Turkmenistan (TM)',
  'Turks and Caicos Islands (TC)',
  'Tuvalu (TV)',
  'Uganda (UG)',
  'Ukraine (UA)',
  'United Arab Emirates (AE)',
  //'United Kingdom (GB)',
  'United Kingdom (England)',
  'United Kingdom (Northern Ireland)',
  'United Kingdom (Scotland)',
  'United Kingdom (Wales)',
  'United States (US)',
  'United States Minor Outlying Islands (UM)',
  'Uruguay (UY)',
  'Uzbekistan (UZ)',
  'Vanuatu (VU)',
  'Venezuela, Bolivarian Republic of (VE)',
  'Viet Nam (VN)',
  'Virgin Islands, British (VG)',
  'Virgin Islands, U.S. (VI)',
  'Wallis and Futuna (WF)',
  'Western Sahara (EH)',
  'Yemen (YE)',
  'Zambia (ZM)',
  'Zimbabwe (ZW)'
]

// Export/dispatch autocomplete
if ($('#export-dispatch-typeahead-container').length > 0) {
  element = document.querySelector('#export-dispatch-typeahead-container')
  id = 'export-dispatch-typeahead' // To match it to the existing <label>.

  accessibleAutocomplete ({
    element: element,
    defaultValue: element.getAttribute('data-default-value'),
    id: id,
    name: id,
    source: countryList,
    minLength: 1,
    showAllValues: true,
    dropdownArrow: () => ''
  })
}

// Interim site autocomplete
if ($('#interim-site-typeahead-container').length > 0) {
  element = document.querySelector('#interim-site-typeahead-container')
  id = 'interim-site-typeahead' // To match it to the existing <label>.

  accessibleAutocomplete ({
    element: element,
    defaultValue: element.getAttribute('data-default-value'),
    id: id,
    name: id,
    source: countryList,
    minLength: 1,
    showAllValues: true,
    dropdownArrow: () => ''
  })
}

// Transit autocomplete
if ($('#transit-typeahead-container').length > 0) {
  element = document.querySelector('#transit-typeahead-container')
  id = 'transit-typeahead' // To match it to the existing <label>.

  accessibleAutocomplete ({
    element: element,
    defaultValue: element.getAttribute('data-default-value'),
    id: id,
    name: id,
    source: countryList,
    minLength: 1,
    showAllValues: true,
    dropdownArrow: () => ''
  })
}

// Import/destination autocomplete
if ($('#import-destination-typeahead-container').length > 0) {
  element = document.querySelector('#import-destination-typeahead-container')
  id = 'import-destination-typeahead' // To match it to the existing <label>.

  accessibleAutocomplete ({
    element: element,
    defaultValue: element.getAttribute('data-default-value'),
    id: id,
    name: id,
    source: countryList,
    minLength: 1,
    showAllValues: true,
    dropdownArrow: () => ''
  })
}

// Importer/consignee autocomplete
if ($('#importer-consignee-typeahead-container').length > 0) {
  element = document.querySelector('#importer-consignee-typeahead-container')
  id = 'importer-consignee-typeahead' // To match it to the existing <label>.

  accessibleAutocomplete ({
    element: element,
    defaultValue: element.getAttribute('data-default-value'),
    id: id,
    name: id,
    source: countryList,
    minLength: 1,
    showAllValues: true,
    dropdownArrow: () => ''
  })
}

// First carrier autocomplete
if ($('#first-carrier-typeahead-container').length > 0) {
  element = document.querySelector('#first-carrier-typeahead-container')
  id = 'first-carrier-typeahead' // To match it to the existing <label>.

  accessibleAutocomplete ({
    element: element,
    defaultValue: element.getAttribute('data-default-value'),
    id: id,
    name: id,
    source: countryList,
    minLength: 1,
    showAllValues: true,
    dropdownArrow: () => ''
  })
}

// Second carrier autocomplete
if ($('#second-carrier-typeahead-container').length > 0) {
  element = document.querySelector('#second-carrier-typeahead-container')
  id = 'second-carrier-typeahead' // To match it to the existing <label>.

  accessibleAutocomplete ({
    element: element,
    defaultValue: element.getAttribute('data-default-value'),
    id: id,
    name: id,
    source: countryList,
    minLength: 1,
    showAllValues: true,
    dropdownArrow: () => ''
  })
}

// Third carrier autocomplete
if ($('#third-carrier-typeahead-container').length > 0) {
  element = document.querySelector('#third-carrier-typeahead-container')
  id = 'third-carrier-typeahead' // To match it to the existing <label>.

  accessibleAutocomplete ({
    element: element,
    defaultValue: element.getAttribute('data-default-value'),
    id: id,
    name: id,
    source: countryList,
    minLength: 1,
    showAllValues: true,
    dropdownArrow: () => ''
  })
}

// Facility or lab autocomplete
if ($('#facility-or-lab-typeahead-container').length > 0) {
  element = document.querySelector('#facility-or-lab-typeahead-container')
  id = 'facility-or-lab-typeahead' // To match it to the existing <label>.

  accessibleAutocomplete ({
    element: element,
    defaultValue: element.getAttribute('data-default-value'),
    id: id,
    name: id,
    source: countryList,
    minLength: 1,
    showAllValues: true,
    dropdownArrow: () => ''
  })
}
