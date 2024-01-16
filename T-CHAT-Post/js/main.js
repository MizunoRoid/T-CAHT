$(function() {

	$('select[multiple].active.3col').multiselect({
	  columns: 3,
	  placeholder: 'タグを選択してください',
	  search: true,
	  searchOptions: {
	      'default': 'タグの検索'
	  },
	  selectAll: true
	});

});