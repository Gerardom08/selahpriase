import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AddCancionComponent } from './add-cancion.component';
import { CancionService } from '../../../components/services/cancion.service';
import { I18nService } from '../../../shared/i18n/i18n.service';
import { I18nModule } from '../../../shared/i18n/i18n.module';
import { ToasterService } from '../../../shared/utils/toaster.service';

describe('AddCancionComponent', () => {
  let component: AddCancionComponent;
  let fixture: ComponentFixture<AddCancionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCancionComponent],
      imports: [CommonModule, ReactiveFormsModule, RouterTestingModule, I18nModule],
      providers: [
        { provide: CancionService, useValue: {} },
        { provide: ToasterService, useValue: {} },
        { provide: I18nService, useValue: { getTranslation: (key: string) => key } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddCancionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
