(function (window, $, undefined) {

  "use strict";

  var $modalButtons = $(".open-modal"),
      $closeButtons = $('.btn-close-modal, .close-modal'),
      $modals       = $('.modal'),
      $doc          = $(document.body);

  function openModal($modal) {
    if ($modal.length) {
      $doc.addClass('modal-is-showing');
      $modal.addClass('is-showing');
    }
  }

  function closeModal($modal) {
    if ($modal.length) {
      $doc.removeClass('modal-is-showing');
      $modal.removeClass('is-showing');
    }
  }

  $modalButtons.on('click', function(evt) {
    openModal($($(this).data('modal')));
  });

  $closeButtons.on('click', function(evt) {
    closeModal($($(this).data('modal')));
  });

  $modals.on('click', function(evt) {
    var $self = $(this);
    if (evt.target === $self[0]) {
      closeModal($self);
    }
  });

  $doc.on('keyup', function(evt) {
    if (evt.key === "Escape") {
      closeModal($('.modal.is-showing'));
    }
  });


})(window, jQuery);
