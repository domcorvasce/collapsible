/**
 * Collapse navbar items dynamically, when there isn't enough space on the screen.
 *
 * @param {String} selector The selector for the items' container
 * @param {Number} threshold The minimum available space in the container
 */
class Collapsible {
  constructor(selector, threshold) {
    this.container = this.queryContainer(selector);
    this.threshold = threshold;
    this.items = this.container.querySelectorAll('li');
    this.itemsDimensions = this.getItemsDimensions();
  }
  /**
   * Given the selector, query the items' container.
   * If it is unreachable, an exception is throwed.
   * 
   * @param {String} selector
   * @returns {*} The items' container element
   */


  queryContainer(selector) {
    const container = document.querySelector(selector);

    if (!container) {
      throw new Error('Collapsible: No element find using "' + selector + '" selector');
    }

    return container;
  }
  /**
   * Get initial dimensions for each item, in order to approximate
   * the space necessary to render them all.
   */


  getItemsDimensions() {
    const dimensions = [];

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      const width = item.getBoundingClientRect().width;
      dimensions.push(width);
    }

    return dimensions;
  }
  /**
   * Calculate the available space based on the page width, and return
   * the amount of items we must collapse.
   * 
   * @returns {Number} Amount of items to collapse
   */


  getAmountOfItemsToCollapse() {
    const renderable = {
      amount: 0,
      width: 0
    };
    const pageWidth = document.body.offsetWidth;

    for (let i = 0; i < this.items.length; i++) {
      const itemWidth = this.itemsDimensions[i];
      renderable.width += itemWidth;
      if (pageWidth - renderable.width < this.threshold) break;
      renderable.amount++;
    }

    return this.items.length - renderable.amount;
  }

  collapse() {
    const menu = this.container.querySelector('.collapsible-menu');
    const dropdown = menu.querySelector('.collapsible-dropdown');
    const dropdownItems = dropdown.querySelectorAll('li');
    const amountOfItemsToCollapse = this.getAmountOfItemsToCollapse(); // Default case on large screens and when there is enough space

    menu.classList.remove('hide');

    if (amountOfItemsToCollapse === 0) {
      menu.classList.add('hide');
    } // Clear the state for each item: both in the original list and in the collapsed one


    this.items.forEach((item, index) => {
      const clone = dropdownItems[index];
      item.classList.remove('hide');
      clone.classList.add('hide');
    });

    for (let i = 0; i < amountOfItemsToCollapse; i++) {
      const index = dropdownItems.length - i - 1;
      const item = this.items[index];
      const clone = dropdownItems[index];
      item.classList.add('hide');
      clone.classList.remove('hide');
    }
  }
  /**
   * Inject the collapsed menu which will contain the exceeding items.
   * The default content is meant to act like a placeholder.
   * You should customize this method based on your needs.
   */


  inject() {
    const menu = document.createElement('li');
    menu.classList.add('collapsible-menu');
    const dropdownList = document.createElement('ul');
    dropdownList.classList.add('dropdown-menu', 'collapsible-dropdown-list');
    const icon = document.createElement('span');
    icon.classList.add('fas', 'fa-bars');
    const dropdown = document.createElement('div');
    dropdown.classList.add('dropdown', 'collapsible-dropdown');
    const button = document.createElement('button');
    button.classList.add('btn', 'dropdown-toggle', 'collapsible-toggle'); // Attach event to toggle dropdown menu, without using default Bootstrap jQuery-based script

    button.addEventListener('click', ev => {
      ev.preventDefault();
      dropdown.classList.toggle('open');
    }); // Copy items from the original navbar

    this.items.forEach(item => {
      const clone = item.cloneNode(true);
      clone.classList.add('hide');
      dropdownList.append(clone);
    });
    button.append(icon);
    dropdown.append(button);
    dropdown.append(dropdownList);
    menu.append(dropdown);
    this.container.append(menu);
  }
  /**
   * Initialize the resize sensor and assign it the right callback,
   * containing the code to collapse exceeding items when necessary.
   */


  render() {
    this.inject();
    this.collapse();
    new ResizeSensor(this.container.parentElement, this.collapse.bind(this));
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbGxhcHNpYmxlLmpzIl0sIm5hbWVzIjpbIkNvbGxhcHNpYmxlIiwiY29uc3RydWN0b3IiLCJzZWxlY3RvciIsInRocmVzaG9sZCIsImNvbnRhaW5lciIsInF1ZXJ5Q29udGFpbmVyIiwiaXRlbXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaXRlbXNEaW1lbnNpb25zIiwiZ2V0SXRlbXNEaW1lbnNpb25zIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiRXJyb3IiLCJkaW1lbnNpb25zIiwiaSIsImxlbmd0aCIsIml0ZW0iLCJ3aWR0aCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInB1c2giLCJnZXRBbW91bnRPZkl0ZW1zVG9Db2xsYXBzZSIsInJlbmRlcmFibGUiLCJhbW91bnQiLCJwYWdlV2lkdGgiLCJib2R5Iiwib2Zmc2V0V2lkdGgiLCJpdGVtV2lkdGgiLCJjb2xsYXBzZSIsIm1lbnUiLCJkcm9wZG93biIsImRyb3Bkb3duSXRlbXMiLCJhbW91bnRPZkl0ZW1zVG9Db2xsYXBzZSIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsImZvckVhY2giLCJpbmRleCIsImNsb25lIiwiaW5qZWN0IiwiY3JlYXRlRWxlbWVudCIsImRyb3Bkb3duTGlzdCIsImljb24iLCJidXR0b24iLCJhZGRFdmVudExpc3RlbmVyIiwiZXYiLCJwcmV2ZW50RGVmYXVsdCIsInRvZ2dsZSIsImNsb25lTm9kZSIsImFwcGVuZCIsInJlbmRlciIsIlJlc2l6ZVNlbnNvciIsInBhcmVudEVsZW1lbnQiLCJiaW5kIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBTUEsTUFBTUEsV0FBTixDQUFrQjtBQUNkQyxFQUFBQSxXQUFXLENBQUNDLFFBQUQsRUFBV0MsU0FBWCxFQUFzQjtBQUM3QixTQUFLQyxTQUFMLEdBQWlCLEtBQUtDLGNBQUwsQ0FBb0JILFFBQXBCLENBQWpCO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQkEsU0FBakI7QUFFQSxTQUFLRyxLQUFMLEdBQWEsS0FBS0YsU0FBTCxDQUFlRyxnQkFBZixDQUFnQyxJQUFoQyxDQUFiO0FBQ0EsU0FBS0MsZUFBTCxHQUF1QixLQUFLQyxrQkFBTCxFQUF2QjtBQUNIO0FBRUQ7Ozs7Ozs7OztBQU9BSixFQUFBQSxjQUFjLENBQUNILFFBQUQsRUFBVztBQUNyQixVQUFNRSxTQUFTLEdBQUdNLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QlQsUUFBdkIsQ0FBbEI7O0FBRUEsUUFBSSxDQUFDRSxTQUFMLEVBQWdCO0FBQ1osWUFBTSxJQUFJUSxLQUFKLENBQVUseUNBQXlDVixRQUF6QyxHQUFvRCxZQUE5RCxDQUFOO0FBQ0g7O0FBRUQsV0FBT0UsU0FBUDtBQUNIO0FBRUQ7Ozs7OztBQUlBSyxFQUFBQSxrQkFBa0IsR0FBRztBQUNqQixVQUFNSSxVQUFVLEdBQUcsRUFBbkI7O0FBRUEsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUtSLEtBQUwsQ0FBV1MsTUFBL0IsRUFBdUNELENBQUMsRUFBeEMsRUFBNEM7QUFDeEMsWUFBTUUsSUFBSSxHQUFJLEtBQUtWLEtBQUwsQ0FBV1EsQ0FBWCxDQUFkO0FBQ0EsWUFBTUcsS0FBSyxHQUFHRCxJQUFJLENBQUNFLHFCQUFMLEdBQTZCRCxLQUEzQztBQUVBSixNQUFBQSxVQUFVLENBQUNNLElBQVgsQ0FBZ0JGLEtBQWhCO0FBQ0g7O0FBRUQsV0FBT0osVUFBUDtBQUNIO0FBRUQ7Ozs7Ozs7O0FBTUFPLEVBQUFBLDBCQUEwQixHQUFHO0FBQ3pCLFVBQU1DLFVBQVUsR0FBRztBQUFFQyxNQUFBQSxNQUFNLEVBQUUsQ0FBVjtBQUFhTCxNQUFBQSxLQUFLLEVBQUU7QUFBcEIsS0FBbkI7QUFDQSxVQUFNTSxTQUFTLEdBQUdiLFFBQVEsQ0FBQ2MsSUFBVCxDQUFjQyxXQUFoQzs7QUFFQSxTQUFLLElBQUlYLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS1IsS0FBTCxDQUFXUyxNQUEvQixFQUF1Q0QsQ0FBQyxFQUF4QyxFQUE0QztBQUN4QyxZQUFNWSxTQUFTLEdBQUcsS0FBS2xCLGVBQUwsQ0FBcUJNLENBQXJCLENBQWxCO0FBQ0FPLE1BQUFBLFVBQVUsQ0FBQ0osS0FBWCxJQUFvQlMsU0FBcEI7QUFFQSxVQUFLSCxTQUFTLEdBQUdGLFVBQVUsQ0FBQ0osS0FBeEIsR0FBaUMsS0FBS2QsU0FBMUMsRUFDSTtBQUVKa0IsTUFBQUEsVUFBVSxDQUFDQyxNQUFYO0FBQ0g7O0FBRUQsV0FBTyxLQUFLaEIsS0FBTCxDQUFXUyxNQUFYLEdBQW9CTSxVQUFVLENBQUNDLE1BQXRDO0FBQ0g7O0FBRURLLEVBQUFBLFFBQVEsR0FBRztBQUNQLFVBQU1DLElBQUksR0FBRyxLQUFLeEIsU0FBTCxDQUFlTyxhQUFmLENBQTZCLG1CQUE3QixDQUFiO0FBQ0EsVUFBTWtCLFFBQVEsR0FBR0QsSUFBSSxDQUFDakIsYUFBTCxDQUFtQix1QkFBbkIsQ0FBakI7QUFDQSxVQUFNbUIsYUFBYSxHQUFHRCxRQUFRLENBQUN0QixnQkFBVCxDQUEwQixJQUExQixDQUF0QjtBQUNBLFVBQU13Qix1QkFBdUIsR0FBRyxLQUFLWCwwQkFBTCxFQUFoQyxDQUpPLENBTVA7O0FBQ0FRLElBQUFBLElBQUksQ0FBQ0ksU0FBTCxDQUFlQyxNQUFmLENBQXNCLE1BQXRCOztBQUVBLFFBQUlGLHVCQUF1QixLQUFLLENBQWhDLEVBQW1DO0FBQ2pDSCxNQUFBQSxJQUFJLENBQUNJLFNBQUwsQ0FBZUUsR0FBZixDQUFtQixNQUFuQjtBQUNELEtBWE0sQ0FhUDs7O0FBQ0EsU0FBSzVCLEtBQUwsQ0FBVzZCLE9BQVgsQ0FBbUIsQ0FBQ25CLElBQUQsRUFBT29CLEtBQVAsS0FBaUI7QUFDaEMsWUFBTUMsS0FBSyxHQUFHUCxhQUFhLENBQUNNLEtBQUQsQ0FBM0I7QUFFQXBCLE1BQUFBLElBQUksQ0FBQ2dCLFNBQUwsQ0FBZUMsTUFBZixDQUFzQixNQUF0QjtBQUNBSSxNQUFBQSxLQUFLLENBQUNMLFNBQU4sQ0FBZ0JFLEdBQWhCLENBQW9CLE1BQXBCO0FBQ0gsS0FMRDs7QUFPQSxTQUFLLElBQUlwQixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHaUIsdUJBQXBCLEVBQTZDakIsQ0FBQyxFQUE5QyxFQUFrRDtBQUM5QyxZQUFNc0IsS0FBSyxHQUFHTixhQUFhLENBQUNmLE1BQWQsR0FBdUJELENBQXZCLEdBQTJCLENBQXpDO0FBQ0EsWUFBTUUsSUFBSSxHQUFHLEtBQUtWLEtBQUwsQ0FBVzhCLEtBQVgsQ0FBYjtBQUNBLFlBQU1DLEtBQUssR0FBR1AsYUFBYSxDQUFDTSxLQUFELENBQTNCO0FBRUFwQixNQUFBQSxJQUFJLENBQUNnQixTQUFMLENBQWVFLEdBQWYsQ0FBbUIsTUFBbkI7QUFDQUcsTUFBQUEsS0FBSyxDQUFDTCxTQUFOLENBQWdCQyxNQUFoQixDQUF1QixNQUF2QjtBQUNIO0FBQ0o7QUFFRDs7Ozs7OztBQUtBSyxFQUFBQSxNQUFNLEdBQUc7QUFDTCxVQUFNVixJQUFJLEdBQUdsQixRQUFRLENBQUM2QixhQUFULENBQXVCLElBQXZCLENBQWI7QUFDQVgsSUFBQUEsSUFBSSxDQUFDSSxTQUFMLENBQWVFLEdBQWYsQ0FBbUIsa0JBQW5CO0FBRUEsVUFBTU0sWUFBWSxHQUFHOUIsUUFBUSxDQUFDNkIsYUFBVCxDQUF1QixJQUF2QixDQUFyQjtBQUNBQyxJQUFBQSxZQUFZLENBQUNSLFNBQWIsQ0FBdUJFLEdBQXZCLENBQTJCLGVBQTNCLEVBQTRDLDJCQUE1QztBQUVBLFVBQU1PLElBQUksR0FBRy9CLFFBQVEsQ0FBQzZCLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBYjtBQUNBRSxJQUFBQSxJQUFJLENBQUNULFNBQUwsQ0FBZUUsR0FBZixDQUFtQixLQUFuQixFQUEwQixTQUExQjtBQUVBLFVBQU1MLFFBQVEsR0FBR25CLFFBQVEsQ0FBQzZCLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBakI7QUFDQVYsSUFBQUEsUUFBUSxDQUFDRyxTQUFULENBQW1CRSxHQUFuQixDQUF1QixVQUF2QixFQUFtQyxzQkFBbkM7QUFFQSxVQUFNUSxNQUFNLEdBQUdoQyxRQUFRLENBQUM2QixhQUFULENBQXVCLFFBQXZCLENBQWY7QUFDQUcsSUFBQUEsTUFBTSxDQUFDVixTQUFQLENBQWlCRSxHQUFqQixDQUFxQixLQUFyQixFQUE0QixpQkFBNUIsRUFBK0Msb0JBQS9DLEVBZEssQ0FnQkw7O0FBQ0FRLElBQUFBLE1BQU0sQ0FBQ0MsZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBa0NDLEVBQUQsSUFBUTtBQUNyQ0EsTUFBQUEsRUFBRSxDQUFDQyxjQUFIO0FBQ0FoQixNQUFBQSxRQUFRLENBQUNHLFNBQVQsQ0FBbUJjLE1BQW5CLENBQTBCLE1BQTFCO0FBQ0gsS0FIRCxFQWpCSyxDQXNCTDs7QUFDQSxTQUFLeEMsS0FBTCxDQUFXNkIsT0FBWCxDQUFvQm5CLElBQUQsSUFBVTtBQUN6QixZQUFNcUIsS0FBSyxHQUFHckIsSUFBSSxDQUFDK0IsU0FBTCxDQUFlLElBQWYsQ0FBZDtBQUVBVixNQUFBQSxLQUFLLENBQUNMLFNBQU4sQ0FBZ0JFLEdBQWhCLENBQW9CLE1BQXBCO0FBQ0FNLE1BQUFBLFlBQVksQ0FBQ1EsTUFBYixDQUFvQlgsS0FBcEI7QUFDSCxLQUxEO0FBT0FLLElBQUFBLE1BQU0sQ0FBQ00sTUFBUCxDQUFjUCxJQUFkO0FBQ0FaLElBQUFBLFFBQVEsQ0FBQ21CLE1BQVQsQ0FBZ0JOLE1BQWhCO0FBQ0FiLElBQUFBLFFBQVEsQ0FBQ21CLE1BQVQsQ0FBZ0JSLFlBQWhCO0FBRUFaLElBQUFBLElBQUksQ0FBQ29CLE1BQUwsQ0FBWW5CLFFBQVo7QUFDQSxTQUFLekIsU0FBTCxDQUFlNEMsTUFBZixDQUFzQnBCLElBQXRCO0FBQ0g7QUFFRDs7Ozs7O0FBSUFxQixFQUFBQSxNQUFNLEdBQUc7QUFDTCxTQUFLWCxNQUFMO0FBQ0EsU0FBS1gsUUFBTDtBQUVBLFFBQUl1QixZQUFKLENBQWlCLEtBQUs5QyxTQUFMLENBQWUrQyxhQUFoQyxFQUErQyxLQUFLeEIsUUFBTCxDQUFjeUIsSUFBZCxDQUFtQixJQUFuQixDQUEvQztBQUNIOztBQXJKYSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29sbGFwc2UgbmF2YmFyIGl0ZW1zIGR5bmFtaWNhbGx5LCB3aGVuIHRoZXJlIGlzbid0IGVub3VnaCBzcGFjZSBvbiB0aGUgc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciBUaGUgc2VsZWN0b3IgZm9yIHRoZSBpdGVtcycgY29udGFpbmVyXG4gKiBAcGFyYW0ge051bWJlcn0gdGhyZXNob2xkIFRoZSBtaW5pbXVtIGF2YWlsYWJsZSBzcGFjZSBpbiB0aGUgY29udGFpbmVyXG4gKi9cbmNsYXNzIENvbGxhcHNpYmxlIHtcbiAgICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgdGhyZXNob2xkKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gdGhpcy5xdWVyeUNvbnRhaW5lcihzZWxlY3Rvcik7XG4gICAgICAgIHRoaXMudGhyZXNob2xkID0gdGhyZXNob2xkO1xuXG4gICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdsaScpO1xuICAgICAgICB0aGlzLml0ZW1zRGltZW5zaW9ucyA9IHRoaXMuZ2V0SXRlbXNEaW1lbnNpb25zKCk7XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIEdpdmVuIHRoZSBzZWxlY3RvciwgcXVlcnkgdGhlIGl0ZW1zJyBjb250YWluZXIuXG4gICAgICogSWYgaXQgaXMgdW5yZWFjaGFibGUsIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd2VkLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxuICAgICAqIEByZXR1cm5zIHsqfSBUaGUgaXRlbXMnIGNvbnRhaW5lciBlbGVtZW50XG4gICAgICovXG4gICAgcXVlcnlDb250YWluZXIoc2VsZWN0b3IpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgXG4gICAgICAgIGlmICghY29udGFpbmVyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbGxhcHNpYmxlOiBObyBlbGVtZW50IGZpbmQgdXNpbmcgXCInICsgc2VsZWN0b3IgKyAnXCIgc2VsZWN0b3InKTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBpbml0aWFsIGRpbWVuc2lvbnMgZm9yIGVhY2ggaXRlbSwgaW4gb3JkZXIgdG8gYXBwcm94aW1hdGVcbiAgICAgKiB0aGUgc3BhY2UgbmVjZXNzYXJ5IHRvIHJlbmRlciB0aGVtIGFsbC5cbiAgICAgKi9cbiAgICBnZXRJdGVtc0RpbWVuc2lvbnMoKSB7XG4gICAgICAgIGNvbnN0IGRpbWVuc2lvbnMgPSBbXTtcbiAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLml0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtICA9IHRoaXMuaXRlbXNbaV07XG4gICAgICAgICAgICBjb25zdCB3aWR0aCA9IGl0ZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgXG4gICAgICAgICAgICBkaW1lbnNpb25zLnB1c2god2lkdGgpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHJldHVybiBkaW1lbnNpb25zO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZSB0aGUgYXZhaWxhYmxlIHNwYWNlIGJhc2VkIG9uIHRoZSBwYWdlIHdpZHRoLCBhbmQgcmV0dXJuXG4gICAgICogdGhlIGFtb3VudCBvZiBpdGVtcyB3ZSBtdXN0IGNvbGxhcHNlLlxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9IEFtb3VudCBvZiBpdGVtcyB0byBjb2xsYXBzZVxuICAgICAqL1xuICAgIGdldEFtb3VudE9mSXRlbXNUb0NvbGxhcHNlKCkge1xuICAgICAgICBjb25zdCByZW5kZXJhYmxlID0geyBhbW91bnQ6IDAsIHdpZHRoOiAwIH07XG4gICAgICAgIGNvbnN0IHBhZ2VXaWR0aCA9IGRvY3VtZW50LmJvZHkub2Zmc2V0V2lkdGg7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLml0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtV2lkdGggPSB0aGlzLml0ZW1zRGltZW5zaW9uc1tpXTtcbiAgICAgICAgICAgIHJlbmRlcmFibGUud2lkdGggKz0gaXRlbVdpZHRoO1xuXG4gICAgICAgICAgICBpZiAoKHBhZ2VXaWR0aCAtIHJlbmRlcmFibGUud2lkdGgpIDwgdGhpcy50aHJlc2hvbGQpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIHJlbmRlcmFibGUuYW1vdW50Kys7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcy5sZW5ndGggLSByZW5kZXJhYmxlLmFtb3VudDtcbiAgICB9XG5cbiAgICBjb2xsYXBzZSgpIHtcbiAgICAgICAgY29uc3QgbWVudSA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5jb2xsYXBzaWJsZS1tZW51Jyk7XG4gICAgICAgIGNvbnN0IGRyb3Bkb3duID0gbWVudS5xdWVyeVNlbGVjdG9yKCcuY29sbGFwc2libGUtZHJvcGRvd24nKTtcbiAgICAgICAgY29uc3QgZHJvcGRvd25JdGVtcyA9IGRyb3Bkb3duLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyk7XG4gICAgICAgIGNvbnN0IGFtb3VudE9mSXRlbXNUb0NvbGxhcHNlID0gdGhpcy5nZXRBbW91bnRPZkl0ZW1zVG9Db2xsYXBzZSgpO1xuXG4gICAgICAgIC8vIERlZmF1bHQgY2FzZSBvbiBsYXJnZSBzY3JlZW5zIGFuZCB3aGVuIHRoZXJlIGlzIGVub3VnaCBzcGFjZVxuICAgICAgICBtZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChhbW91bnRPZkl0ZW1zVG9Db2xsYXBzZSA9PT0gMCkge1xuICAgICAgICAgIG1lbnUuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2xlYXIgdGhlIHN0YXRlIGZvciBlYWNoIGl0ZW06IGJvdGggaW4gdGhlIG9yaWdpbmFsIGxpc3QgYW5kIGluIHRoZSBjb2xsYXBzZWQgb25lXG4gICAgICAgIHRoaXMuaXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNsb25lID0gZHJvcGRvd25JdGVtc1tpbmRleF07XG5cbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgY2xvbmUuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFtb3VudE9mSXRlbXNUb0NvbGxhcHNlOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gZHJvcGRvd25JdGVtcy5sZW5ndGggLSBpIC0gMTtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLml0ZW1zW2luZGV4XTtcbiAgICAgICAgICAgIGNvbnN0IGNsb25lID0gZHJvcGRvd25JdGVtc1tpbmRleF07XG5cbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgY2xvbmUuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5qZWN0IHRoZSBjb2xsYXBzZWQgbWVudSB3aGljaCB3aWxsIGNvbnRhaW4gdGhlIGV4Y2VlZGluZyBpdGVtcy5cbiAgICAgKiBUaGUgZGVmYXVsdCBjb250ZW50IGlzIG1lYW50IHRvIGFjdCBsaWtlIGEgcGxhY2Vob2xkZXIuXG4gICAgICogWW91IHNob3VsZCBjdXN0b21pemUgdGhpcyBtZXRob2QgYmFzZWQgb24geW91ciBuZWVkcy5cbiAgICAgKi9cbiAgICBpbmplY3QoKSB7XG4gICAgICAgIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICBtZW51LmNsYXNzTGlzdC5hZGQoJ2NvbGxhcHNpYmxlLW1lbnUnKTtcblxuICAgICAgICBjb25zdCBkcm9wZG93bkxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgICAgICBkcm9wZG93bkxpc3QuY2xhc3NMaXN0LmFkZCgnZHJvcGRvd24tbWVudScsICdjb2xsYXBzaWJsZS1kcm9wZG93bi1saXN0Jyk7XG5cbiAgICAgICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdmYXMnLCAnZmEtYmFycycpO1xuXG4gICAgICAgIGNvbnN0IGRyb3Bkb3duID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRyb3Bkb3duLmNsYXNzTGlzdC5hZGQoJ2Ryb3Bkb3duJywgJ2NvbGxhcHNpYmxlLWRyb3Bkb3duJyk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdkcm9wZG93bi10b2dnbGUnLCAnY29sbGFwc2libGUtdG9nZ2xlJyk7XG5cbiAgICAgICAgLy8gQXR0YWNoIGV2ZW50IHRvIHRvZ2dsZSBkcm9wZG93biBtZW51LCB3aXRob3V0IHVzaW5nIGRlZmF1bHQgQm9vdHN0cmFwIGpRdWVyeS1iYXNlZCBzY3JpcHRcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZHJvcGRvd24uY2xhc3NMaXN0LnRvZ2dsZSgnb3BlbicpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBDb3B5IGl0ZW1zIGZyb20gdGhlIG9yaWdpbmFsIG5hdmJhclxuICAgICAgICB0aGlzLml0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNsb25lID0gaXRlbS5jbG9uZU5vZGUodHJ1ZSk7XG5cbiAgICAgICAgICAgIGNsb25lLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIGRyb3Bkb3duTGlzdC5hcHBlbmQoY2xvbmUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBidXR0b24uYXBwZW5kKGljb24pO1xuICAgICAgICBkcm9wZG93bi5hcHBlbmQoYnV0dG9uKTtcbiAgICAgICAgZHJvcGRvd24uYXBwZW5kKGRyb3Bkb3duTGlzdCk7XG5cbiAgICAgICAgbWVudS5hcHBlbmQoZHJvcGRvd24pO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmQobWVudSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgcmVzaXplIHNlbnNvciBhbmQgYXNzaWduIGl0IHRoZSByaWdodCBjYWxsYmFjayxcbiAgICAgKiBjb250YWluaW5nIHRoZSBjb2RlIHRvIGNvbGxhcHNlIGV4Y2VlZGluZyBpdGVtcyB3aGVuIG5lY2Vzc2FyeS5cbiAgICAgKi9cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHRoaXMuaW5qZWN0KCk7XG4gICAgICAgIHRoaXMuY29sbGFwc2UoKTtcblxuICAgICAgICBuZXcgUmVzaXplU2Vuc29yKHRoaXMuY29udGFpbmVyLnBhcmVudEVsZW1lbnQsIHRoaXMuY29sbGFwc2UuYmluZCh0aGlzKSk7XG4gICAgfVxufVxuIl0sImZpbGUiOiJjb2xsYXBzaWJsZS5qcyJ9